/*
 *  JWT token verification plugin to protect routes that require login.
 *  Created On 02 February 2022
 */

import { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

const func: any = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        await req.jwtVerify()
    } catch (err) {
        rep.send(err)
    }
}

export default fp(func)
