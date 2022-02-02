import { FastifyReply, FastifyRequest } from "fastify"
import { AlpaAPIConfig } from "../../../../config/interface"
import auth from '../../../plugins/auth.js';

const getHandler = (config: AlpaAPIConfig) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => rep.clearCookie('token', {
    domain: config.server.host,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: true,
    signed: true,
    maxAge: 259200
}).status(200).send({
    message: 'Successfully logged out'
})

export default {
    path: '/auth/logout',
    method: 'DELETE',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
