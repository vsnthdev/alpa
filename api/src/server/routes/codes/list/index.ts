/*
 *  List out all short codes with pagination.
 *  Created On 03 February 2022
 */

import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '../../../../database/index.js'
import auth from '../../../plugins/auth.js'
import { Code } from '../make/index.js'

interface RequestQuery {
    cursor: string
    search: string
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

const getRecentList = async (query: RequestQuery) => {
    if (typeof query.cursor != 'string') query.cursor = '0'
    const { cursor: now, keys } = await db.codes.scan(parseInt(query.cursor), {
        COUNT: 50,
    })

    const codes = await keysToCodes(keys)

    return { cursor: now, codes }
}

const executeQuery = async ({ search }: RequestQuery) => {
    // the result
    const results = { codes: [] }

    // search for direct keys
    const { keys } = await db.codes.scan(0, {
        MATCH: `${search}*`,
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
    opts: {
        preValidation: [auth],
    },
}
