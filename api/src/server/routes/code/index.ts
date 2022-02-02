import { FastifyReply, FastifyRequest } from "fastify"
import { AlpaAPIConfig } from "../../../config/interface"
import { ConnectionsList } from "../../../database"
import boom from 'boom';
import { Code } from "../codes/make";

const getHandler =  (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const str = await db.codes.get(req.params['code'])
    if (!str) throw boom.notFound()

    const code = JSON.parse(str) as Code

    if (code.links.length == 1) {
        return rep.redirect(307, code.links[0].url)
    } else {
        throw boom.notImplemented()
    }
}

export default {
    path: '/:code',
    method: 'GET',
    getHandler,
}
