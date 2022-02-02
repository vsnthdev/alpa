import { FastifyReply, FastifyRequest } from "fastify"
import { AlpaAPIConfig } from "../../../../config/interface"
import { ConnectionsList } from "../../../../database"
import auth from '../../../plugins/auth.js'
import boom from 'boom';

const getHandler = (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const exists = await db.codes.exists(req.params['code'])
    if (!exists) throw boom.notFound()

    await db.codes.del(req.params['code'])
    return rep.status(204).send('')
}

export default {
    path: '/api/codes/:code',
    method: 'DELETE',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
