/*
 *  Takes username, password and responds with a JWT token.
 *  Created On 02 February 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AlpaAPIConfig } from '../../../../config/interface.js'

const getHandler =
    (config: AlpaAPIConfig) =>
    async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
        if (
            !req.body ||
            [
                req.body['username'],
                req.body['password'],
                req.body['username'] == config.auth.username,
                req.body['password'] == config.auth.password,
            ]
                .map(elm => Boolean(elm))
                .includes(false)
        )
            throw boom.unauthorized()

        const token = await rep.jwtSign(
            {
                username: config.auth.username,
                email: config.auth.email,
            },
            {
                sign: {
                    expiresIn: 259200,
                },
            },
        )

        return rep.status(200).send({
            message: 'Login was successful',
            token,
        })
    }

export default {
    path: '/api/auth/login',
    method: 'POST',
    getHandler,
}
