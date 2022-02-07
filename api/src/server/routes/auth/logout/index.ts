import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify"
import { AlpaAPIConfig } from "../../../../config/interface"
import { ConnectionsList } from "../../../../database";
import auth from '../../../plugins/auth.js';

const getHandler = (config: AlpaAPIConfig, db: ConnectionsList, fastify: FastifyInstance) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const token = req.headers.authorization.slice(7)
    const decoded = fastify.jwt.decode(token)
    const secondsRemaining = decoded['exp'] - Math.round((new Date()).getTime() / 1000)

    await db.tokens.set(token, '1', 'EX', secondsRemaining)

    return rep.status(204).send('')
}

export default {
    path: '/api/auth/logout',
    method: 'DELETE',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
