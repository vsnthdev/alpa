import { FastifyReply, FastifyRequest } from "fastify"
import { AlpaAPIConfig } from "../../../config/interface.js";

const getHandler = (config: AlpaAPIConfig) => {
    return async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
        if (!req.body || [req.body['username'], req.body['password'], req.body['username'] == config.auth.username, req.body['password'] == config.auth.password].map(elm => Boolean(elm)).includes(false)) return rep.status(401).send({
            message: "Unauthorized"
        })

        const token = await rep.jwtSign({
            username: config.auth.username
        }, {
            sign: {
                expiresIn: 259200,
            }
        })

        return rep.setCookie('token', token, {
            domain: config.server.host,
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true,
            signed: true,
            maxAge: 259200
        }).status(200).send({
            message: 'Login success'
        })
    }
}

export default {
    path: '/',
    method: 'POST',
    getHandler,
}
