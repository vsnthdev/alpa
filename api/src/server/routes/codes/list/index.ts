import auth from '../../../plugins/auth.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AlpaAPIConfig } from '../../../../config/interface.js';
import { ConnectionsList, getIndexName } from '../../../../database.js';
import { Code } from '../make/index.js';

interface RequestQuery {
    cursor: string
    search: string
}

const keysToCodes = async (keys: string[], db: ConnectionsList): Promise<Code[]> => {
    const codes = []

    for (const key of keys) {
        const code = await db.codes.json.get(key)
        codes.push({ ...{ code: key }, ...code })
    }

    return codes
}

const documentsToCodes = async (docs: any[]) => {
    const codes = []

    for (const doc of docs) {
        doc.value['code'] = doc.id
        codes.push(doc.value)
    }

    return codes
}

const getRecentList = async (query: RequestQuery, db: ConnectionsList) => {
    if (typeof query.cursor != 'string') query.cursor = '0'
    const { cursor: now, keys } = await db.codes.scan(parseInt(query.cursor), {
        COUNT: 50
    })

    const codes = keysToCodes(keys, db)

    return { cursor: now, codes }
}

const executeQuery = async ({ search}:  RequestQuery, db: ConnectionsList) => {
    // the result
    const results = { codes: [] }

    // search for direct keys
    const { keys } = await db.codes.scan(0, {
        MATCH: `${search}*`
    })

    results.codes = results.codes.concat(
        await keysToCodes(keys, db)
    )

    // search for tags
    const indexName = getIndexName()
    const { documents } = await db.codes.ft.search(indexName, `@tags:{ ${search.split(' ').map(tag => `${tag}*`).join(' | ').trim()} }`)

    results.codes = results.codes.concat(
        await documentsToCodes(documents)
    )

    return results
}

const getHandler = (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const query = req.query as RequestQuery
    const toSend = rep.status(200)

    if (query.search) {
        return toSend.send(await executeQuery(query, db))
    } else {
        return toSend.send(await getRecentList(query, db))
    }
}

export default {
    path: '/api/codes',
    method: 'GET',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
