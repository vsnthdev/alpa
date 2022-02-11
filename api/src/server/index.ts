/*
 *  Sets up fastify API server.
 *  Created On 30 January 2022
 */

import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { log } from '../logger.js';
import { AlpaAPIConfig } from '../config/interface';
import chalk from 'chalk';
import jwt from 'fastify-jwt';
import glob from 'glob';
import path from 'path';
import dirname from 'es-dirname';
import boom from 'fastify-boom';
import { ConnectionsList } from '../database.js';
import cors from 'fastify-cors';
import { config } from '../config/index.js';
import { db } from '../database.js';

export interface RouteImpl {
    path: string
    method: string
    opts: any
    getHandler: (config: AlpaAPIConfig, db: ConnectionsList, fastify: FastifyInstance) => (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>
}

export let fastify: FastifyInstance

const loadRoutes = async (fastify: FastifyInstance, config: AlpaAPIConfig, db: ConnectionsList): Promise<void> => {
    const globStr = path.join(dirname(), 'routes', '**', 'index.js')
    const files = glob.sync(globStr, {
        nodir: true,
        noext: true
    })

    for (const file of files) {
        const { default: route }: { default: RouteImpl } = await import(`file://${file}`)

        route.method = route.method.toLowerCase()
        if (!route.opts) route.opts = {}
        fastify[route.method](route.path, route.opts, route.getHandler(config, db, fastify))
    }
}

export default async (): Promise<void> => new Promise((resolve, reject) => {
    fastify = Fastify({
        // TODO: implement a custom logger, and attach it here
        logger: false
    })

    fastify.register(jwt, {
        secret: config.server.secret
    })

    fastify.register(cors, {
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
        origin: '*',
        allowedHeaders: ['Authorization', 'Content-Type']
    })

    fastify.register(boom)

    loadRoutes(fastify, config, db)
        .then(() => fastify.listen(config.server.port, config.server.host, (err, address) => {
                // log the error and terminate execution
                err && log.error(err, 2)

                // log the success and resolve promise
                log.success(`${chalk.whiteBright.bold('@alpa/api')} listening at ${chalk.gray.underline(`http://${config.server.host}:${config.server.port}`)}`)               
                resolve()
            }))
})
