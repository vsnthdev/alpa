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
    // read the URL parameters
    const params = req.params as ParamsImpl

    // determine the code, or use _root if no code is provided
    const links = (await db.codes.json.get(params.code || '_root', {
        path: ['links'],
    })) as CodeLink[]

    // handle when links don't exist
    if (!links) throw boom.notFound()

    // apply caching headers
    rep.header('Cache-Control', 'max-age=60')

    // only single link redirection has been implemented till now
    // for multiple, we either send a JavaScript response
    // or a full HTML page rendered on the server
    if (links.length == 1) {
        return rep.redirect(301, links[0].url)
    } else {
        throw boom.notImplemented()
    }
}

export default {
    handler,
    method: 'GET',
    url: ['/:code', '/'],
}
