/*
 *  Creates, updates an existing, or deletes configuration.
 *  Created On 10 May 2022
 */

import boom from 'boom'
import dot from 'dot-object'
import { FastifyReply, FastifyRequest } from 'fastify'

import config from '../../../database/config.js'
import auth from '../../plugins/auth.js'

interface AllowedConfigs {
    [key: string]: {
        restart: boolean
    }
}

// these are config keys allowed to be changed
// through the web API, along with a boolean that tells
// whether a restart is required to take effect or not
const allowed: AllowedConfigs = {
    'server.host': {
        restart: true,
    },
    'server.port': {
        restart: true,
    },
    'server.secret': {
        restart: false,
    },
    'server.cors': {
        restart: true,
    },
}

const getHandler = () => async (req: FastifyRequest, rep: FastifyReply) => {
    let restart = false

    for (const key in dot.dot(req.body)) {
        // check if there are any restricted keys being set
        if (Object.keys(dot.dot(req.body)).includes(key) == false)
            throw boom.forbidden(
                `The key "${key}" is not allowed to be configured.`,
                req.body,
            )

        // determine whether a server restart is required for changes
        // to fully take effect
        if (restart != true) restart = allowed[key].restart
    }

    // write the changes to the database
    await config.set(req.body)

    return rep.status(201).send({
        message: 'Updated config accordingly',
        data: {
            restart,
        },
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
