/*
 *  JWT token verification plugin to protect routes that require login.
 *  Created On 02 February 2022
 */

import boom from 'boom'
import { FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

import { db } from '../../database/index.js'

const func: any = async (req: FastifyRequest) => {
    try {
        // check if that token exists in our black list
        // if yes, then we simply throw an error, so it gets
        // caught by the try/catch and throws 401 Unauthorized
        const token = req.headers.authorization?.slice(7) as string
        if (await db.tokens?.exists(token)) throw new Error('Unauthorized')

        // if the token isn't in our black list then we check for validity
        await req.jwtVerify()
    } catch (err) {
        throw boom.unauthorized()
    }
}

export default fp(func)
