/*
 *  Creates, updates an existing, or deletes configuration.
 *  Created On 10 May 2022
 */

import boom from 'boom'
import dot from 'dot-object'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AlpaAPIConfig } from '../../../config/interface.js'
import { ConnectionsList } from '../../../database.js'
import auth from '../../plugins/auth.js'

const allowed = ['server.host', 'server.port']

const getHandler =
    (config: AlpaAPIConfig, db: ConnectionsList) =>
    async (req: FastifyRequest, rep: FastifyReply) => {
        // check if there are any restricted keys being set
        for (const key in req.body as any) {
            if (allowed.includes(key) == false)
                throw boom.forbidden(
                    `The key "${key}" is not allowed to be configured.`,
                    req.body,
                )
        }

        // fetch existing config
        let current = await db.config.json.get('config')

        // process each config key separately
        for (const key in req.body as any) {
            const value = req.body[key]

            if (value === null) {
                // delete the key in our database
                dot.del(key, current)
            } else {
                current = dot.str(key, value, current)
            }
        }

        // write back the updated config
        await db.config.json.set('config', '$', current)

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
