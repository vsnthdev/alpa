import { FastifyReply, FastifyRequest } from "fastify"

const handler = async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    return {
        message: 'hit'
    }
}

export default {
    path: '/',
    method: 'GET',
    handler,
}
