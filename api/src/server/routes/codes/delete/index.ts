/*
 *  Deletes a short code from the database.
 *  Created On 03 February 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '../../../../database/index.js'
import auth from '../../../plugins/auth.js'

export interface ParamsImpl {
    code: string
}

const handler = async (req: FastifyRequest, rep: FastifyReply) => {
    const params = req.params as ParamsImpl

    const exists = await db.codes.exists(params.code)
    if (!exists) throw boom.notFound()

    await db.codes.del(params.code)
    return rep.status(204).send('')
}

export default {
    handler,
    method: 'DELETE',
    url: ['/api/codes/:code'],
    opts: {
        preValidation: [auth],
    },
}
