/*
 *  Deletes a short code from the database.
 *  Created On 03 February 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AlpaAPIConfig } from '../../../../config/interface'
import { ConnectionsList } from '../../../../database'
import auth from '../../../plugins/auth.js'

const getHandler =
    (config: AlpaAPIConfig, db: ConnectionsList) =>
    async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
        const exists = await db.codes.exists(req.params['code'])
        if (!exists) throw boom.notFound()

        await db.codes.del(req.params['code'])
        return rep.status(204).send('')
    }

export default {
    path: '/api/codes/:code',
    method: 'DELETE',
    opts: {
        preValidation: [auth],
    },
    getHandler,
}
