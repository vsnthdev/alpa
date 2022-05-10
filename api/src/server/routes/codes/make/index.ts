/*
 *  Creates a new short code.
 *  Created On 03 February 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AlpaAPIConfig } from '../../../../config/interface.js'
import { ConnectionsList } from '../../../../database/index.js'
import auth from '../../../plugins/auth.js'

export interface CodeLink {
    title: string
    icon: string
    image: string
    url: string
}

export interface Code {
    code: string
    tags: string
    links: CodeLink[]
}

const getHandler =
    (config: AlpaAPIConfig, db: ConnectionsList) =>
    async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
        const body = req.body as Code
        const code = body.code
        delete body.code

        if (code == 'api')
            throw boom.notAcceptable('A code named api cannot be created.')

        const exists = await db.codes.exists(code)
        if (exists && Boolean(req.query['force']) == false)
            throw boom.conflict('That code already exists')

        await db.codes.json.set(code, '$', body)

        if (exists) {
            return rep.status(200).send({
                message: 'Updated the code',
            })
        } else {
            return rep.status(201).send({
                message: 'Created a new code',
            })
        }
    }

export default {
    path: '/api/codes',
    method: 'POST',
    opts: {
        preValidation: [auth],
    },
    getHandler,
}
