import auth from '../../../plugins/auth.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AlpaAPIConfig } from '../../../../config/interface.js';
import { ConnectionsList } from '../../../../database.js';

const getHandler = (config: AlpaAPIConfig, db: ConnectionsList) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const codes = await db.codes.keys('*')

    return rep.status(200).send({ codes })
}

export default {
    path: '/api/codes',
    method: 'GET',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
