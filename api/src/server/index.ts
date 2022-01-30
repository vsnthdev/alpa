/*
 *  Sets up fastify API server.
 *  Created On 30 January 2022
 */

import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Logger } from 'itivrutaha/dist/class';
import { AlpaAPIConfig } from '../config/interface';
import chalk from 'chalk';
import jwt from 'fastify-jwt';
import glob from 'glob';
import path from 'path';
import dirname from 'es-dirname';
import slash from 'slash';

export interface RouteImpl {
    path: string
    method: string
    handler: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>
}

// copied from 👇
// https://stackoverflow.com/questions/6680825/return-string-without-trailing-slash
const stripTrailingSlash = str => str.endsWith('/') ? str.slice(0, -1) : str

const getPath = (file: string, addition: string): string => {
    file = file.substring(path.join(dirname(), 'routes').length + 1)
    const base = path.basename(file)
    return '/' + path.join(file.slice(0, -base.length - 1), addition)
}

const loadRoutes = async (fastify: FastifyInstance): Promise<void> => {
    const globStr = path.join(dirname(), 'routes', '**', 'index.js')
    const files = glob.sync(globStr, {
        nodir: true,
        noext: true
    })

    for (const file of files) {
        const { default: route }: { default: RouteImpl } = await import(`file://${file}`)

        // apply the path transformation
        route.path = stripTrailingSlash(slash(getPath(file, route.path)))
        route.method = route.method.toLowerCase()

        fastify[route.method](route.path, route.handler)
    }
}

export default async (log: Logger, { server }: AlpaAPIConfig): Promise<void> => new Promise((resolve, reject) => {
    const fastify = Fastify({
        // TODO: implement a custom logger, and attach it here
        logger: false
    })

    fastify.register(jwt, {
        secret: server.secret,
    })

    loadRoutes(fastify)
        .then(() => fastify.listen(server.port, server.host, (err, address) => {
                log.success(`${chalk.whiteBright.bold('@alpa/api')} listening at ${chalk.gray.underline(`http://${server.host}:${server.port}`)}`)
                resolve()
            }))
})
