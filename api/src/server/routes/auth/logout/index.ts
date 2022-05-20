/*
 *  Blacklists the token until expired to prevent usage.
 *  Created On 02 February 2022
 */

import { FastifyReply, FastifyRequest } from 'fastify'
import { DecodePayloadType } from 'fastify-jwt'

import { db } from '../../../../database/index.js'
import { fastify } from '../../../index.js'
import auth from '../../../plugins/auth.js'

const handler = async (req: FastifyRequest, rep: FastifyReply) => {
    const token = req.headers.authorization?.slice(7) as string
    const decoded = fastify.jwt.decode(token) as DecodePayloadType
    const secondsRemaining =
        decoded['exp'] - Math.round(new Date().getTime() / 1000)

    await db.tokens?.set(token, 1, {
        EX: secondsRemaining,
    })

    return rep.status(204).send('')
}

export default {
    handler,
    method: 'DELETE',
    url: ['/api/auth/logout'],
    opts: {
        preValidation: [auth],
    },
}
