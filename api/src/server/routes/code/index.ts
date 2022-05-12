/*
 *  Redirects if short code is found or returns 404.
 *  Created On 03 February 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '../../../database/index.js'
import { CodeLink } from '../codes/make'

export interface ParamsImpl {
    code: string
}

const handler = async (req: FastifyRequest, rep: FastifyReply) => {
    const params = req.params as ParamsImpl

    const links = (await db.codes.json.get(params.code || '_root', {
        path: ['links'],
    })) as CodeLink[]

    if (!links) throw boom.notFound()

    if (links.length == 1) {
        return rep.redirect(307, links[0].url)
    } else {
        throw boom.notImplemented()
    }
}

export default {
    handler,
    method: 'GET',
    url: ['/:code', '/'],
}
