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
import cookie from 'fastify-cookie';

export interface RouteImpl {
    path: string
    method: string
    getHandler: (config: AlpaAPIConfig) => (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>
}

export let fastify: FastifyInstance

// copied from 👇
// https://stackoverflow.com/questions/6680825/return-string-without-trailing-slash
const stripTrailingSlash = str => str.endsWith('/') ? str.slice(0, -1) : str

const getPath = (file: string, addition: string): string => {
    file = file.substring(path.join(dirname(), 'routes').length + 1)
    const base = path.basename(file)
    return '/' + path.join(file.slice(0, -base.length - 1), addition)
}

const loadRoutes = async (fastify: FastifyInstance, config: AlpaAPIConfig): Promise<void> => {
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

        fastify[route.method](route.path, route.getHandler(config))
    }
}

export default async (log: Logger, config: AlpaAPIConfig): Promise<void> => new Promise((resolve, reject) => {
    fastify = Fastify({
        // TODO: implement a custom logger, and attach it here
        logger: false
    })

    fastify.register(jwt, {
        secret: config.server.secret,
        cookie: {
            cookieName: 'token',
            signed: true
        }
    })

    fastify.register(cookie, {
        secret: config.server.secret
    })

    loadRoutes(fastify, config)
        .then(() => fastify.listen(config.server.port, config.server.host, (err, address) => {
                log.success(`${chalk.whiteBright.bold('@alpa/api')} listening at ${chalk.gray.underline(`http://${config.server.host}:${config.server.port}`)}`)
                resolve()
            }))
})
