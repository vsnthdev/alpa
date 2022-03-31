/*
 *  Redirects if short code is found or returns 404.
 *  Created On 03 February 2022
 */

import { FastifyReply, FastifyRequest } from "fastify"
import { AlpaAPIConfig } from "../../../config/interface"
import { ConnectionsList } from "../../../database"
import boom from 'boom';
import { CodeLink } from "../codes/make";

const getHandler =  (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const links = await db.codes.json.get(req.params['code'] || "_root", {
        path: [
            'links'
        ]
    }) as CodeLink[]

    if (!links) throw boom.notFound()

    if (links.length == 1) {
        return rep.redirect(307, links[0].url)
    } else {
        throw boom.notImplemented()
    }
}

export default {
    path: ['/:code', '/'],
    method: 'GET',
    getHandler,
}
