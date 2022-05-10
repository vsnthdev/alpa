/*
 *  Creates, updates an existing, or deletes configuration.
 *  Created On 10 May 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import config from '../../../database/config.js'
import auth from '../../plugins/auth.js'

// these are config keys allowed to be changed
// through the web API
const allowed = ['server.host', 'server.port']

const getHandler = () => async (req: FastifyRequest, rep: FastifyReply) => {
    // check if there are any restricted keys being set
    for (const key in req.body as any) {
        if (allowed.includes(key) == false)
            throw boom.forbidden(
                `The key "${key}" is not allowed to be configured.`,
                req.body,
            )
    }

    // write the changes to the database
    await config.set(req.body)

    return rep.status(201).send({
        message: 'Updated config accordingly',
    })
}

export default {
    path: '/api/config',
    method: 'POST',
    getHandler,
    opts: {
        preValidation: [auth],
    },
}
