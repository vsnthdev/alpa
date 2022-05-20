/*
 *  List out all short codes with pagination.
 *  Created On 03 February 2022
 */

import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '../../../../database/index.js'
import auth from '../../../plugins/auth.js'
import { Code } from '../make/index.js'

interface RequestQuery {
    page: string
    search: string
}

interface ResponseImpl {
    pages: number
    codes: Code[]
}

const keysToCodes = async (keys: string[]): Promise<Code[]> => {
    const codes: any[] = []

    for (const key of keys) {
        const code = await db.codes.json.get(key)
        codes.push({ ...{ code: key }, ...code })
    }

    return codes
}

const documentsToCodes = async (docs: any[]) => {
    const codes: any[] = []

    for (const doc of docs) {
        doc.value['code'] = doc.id
        codes.push(doc.value)
    }

    return codes
}

const getRecentList = async (query: RequestQuery): Promise<ResponseImpl> => {
    // get the number of total keys in the database
    const total: number = await db.codes.dbSize()

    // create a response skeleton object
    const res: ResponseImpl = {
        pages: -1,
        codes: [],
    }

    // handle when there are no codes in the database
    if (total == 0) return { ...res, ...{ pages: 0 } }

    // initialize the cursor variable
    if (typeof query.page != 'string') query.page = '0'

    // now fetch keys from our sorted set in Redis
    const count = 10
    const start = count * parseInt(query.page)
    const end = start + (count - 1)

    const keys = await db.config.zRange('codes', start, end, {
        REV: true,
    })

    // convert database keys to actual codes
    const codes = await keysToCodes(keys)

    return { ...res, ...{ pages: Math.round(total / count), codes } }
}

const executeQuery = async ({ search }: RequestQuery) => {
    // remove any special characters since
    // that crashes the server
    search = search.replace(/[^a-zA-Z0-9 ]/g, '')

    // the result
    const results = { codes: [] }

    // don't perform a search, if input is nothing
    if (!search) return results

    // search for direct keys
    const { keys } = await db.codes.scan(0, {
        MATCH: `"${search}*"`,
    })

    results.codes = results.codes.concat((await keysToCodes(keys)) as any)

    // search for tags
    const { documents } = await db.codes.ft.search(
        'codes',
        `@tags:{ ${search
            .split(' ')
            .map(tag => `${tag}*`)
            .join(' | ')
            .trim()} }`,
    )

    results.codes = results.codes.concat(
        (await documentsToCodes(documents)) as any,
    )

    return results
}

const handler = async (req: FastifyRequest, rep: FastifyReply) => {
    const query = req.query as RequestQuery
    const toSend = rep.status(200)

    if (query.search) {
        return toSend.send(await executeQuery(query))
    } else {
        return toSend.send(await getRecentList(query))
    }
}

export default {
    handler,
    method: 'GET',
    url: ['/api/codes'],
    preValidation: [auth],
}
