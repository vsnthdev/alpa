import auth from '../../../plugins/auth.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AlpaAPIConfig } from '../../../../config/interface.js';
import { ConnectionsList } from '../../../../database.js';

const getHandler = (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const cursor = req.query['cursor'] || 0
    const { cursor: now, keys } = await db.codes.scan(cursor, {
        COUNT: 50
    })

    const codes = []

    for (const key of keys) {
        const code = await db.codes.json.get(key)
        codes.push({ ...{ code: key }, ...code })
    }

    return rep.status(200).send({ cursor: now, codes })
}

export default {
    path: '/api/codes',
    method: 'GET',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
