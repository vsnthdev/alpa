/*
 *  Creates, updates an existing, or deletes configuration.
 *  Created On 10 May 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import config from '../../../database/config.js'
import auth from '../../plugins/auth.js'
import validate from './validate.js'

export interface ResponseImpl {
    message: string
    data?: any
}

const ajvErrorResponseTransform = (func: any, err: any) => {
    err.output.payload['data'] = func.errors?.map((e: any) => {
        delete e.schemaPath
        return e
    })
    throw err
}

const handler = async (req: FastifyRequest, rep: FastifyReply) => {
    // validate user input
    if (!validate(req.body as any)) {
        const err = boom.badRequest('Invalid config request')
        ajvErrorResponseTransform(validate, err)
    }

    // write the changes to the database
    await config.set(req.body)

    return rep.status(201).send({
        message: 'Updated config accordingly',
    })
}

export default {
    handler,
    method: 'POST',
    url: ['/api/config'],
    preValidation: [auth],
}
