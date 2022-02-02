import auth from '../../../plugins/auth.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AlpaAPIConfig } from '../../../../config/interface.js';
import { ConnectionsList } from '../../../../database.js';
import boom from 'boom';
import { Code } from '../make/index.js';

const getHandler = (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const str = await db.codes.get(req.params['code'])
    if (!str) throw boom.notFound()

    const code = JSON.parse(str) as Code

    return rep.status(200).send({ ...{ code: req.params['code'] }, ...code })
}

export default {
    path: '/api/codes/:code',
    method: 'GET',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
