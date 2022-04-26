/*
 *  Sets up fastify API server.
 *  Created On 30 January 2022
 */

import chalk from 'chalk'
import dirname from 'es-dirname'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import boom from 'fastify-boom'
import cors from 'fastify-cors'
import jwt from 'fastify-jwt'
import glob from 'glob'
import path from 'path'

import { config } from '../config/index.js'
import { AlpaAPIConfig } from '../config/interface'
import { ConnectionsList } from '../database.js'
import { db } from '../database.js'
import { log } from '../logger.js'

export interface RouteImpl {
    path: string | string[]
    method: string
    opts: any
    getHandler: (
        config: AlpaAPIConfig,
        db: ConnectionsList,
        fastify: FastifyInstance,
    ) => (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>
}

export let fastify: FastifyInstance

const loadRoutes = async (
    fastify: FastifyInstance,
    config: AlpaAPIConfig,
    db: ConnectionsList,
): Promise<void> => {
    const globStr = path.join(dirname(), 'routes', '**', 'index.js')
    const files = glob.sync(globStr, {
        nodir: true,
        noext: true,
    })

    for (const file of files) {
        const { default: route }: { default: RouteImpl } = await import(
            `file://${file}`
        )

        route.method = route.method.toLowerCase()
        if (!route.opts) route.opts = {}

        if (typeof route.path == 'string') {
            fastify[route.method](
                route.path,
                route.opts,
                route.getHandler(config, db, fastify),
            )
        } else {
            for (const another of route.path) {
                fastify[route.method](
                    another,
                    route.opts,
                    route.getHandler(config, db, fastify),
                )
            }
        }
    }
}

const getCors = (): string[] => {
    const devURL = 'http://localhost:3000'

    const prod = process.env.NODE_ENV == 'production'
    if (prod == false && config.server.cors.includes(devURL) == false)
        config.server.cors.push(devURL)

    return config.server.cors
}

export default async (): Promise<void> =>
    new Promise(resolve => {
        fastify = Fastify({
            // TODO: implement a custom logger, and attach it here
            logger: false,
        })

        fastify.register(jwt, {
            secret: config.server.secret,
        })

        fastify.register(cors, {
            methods: ['GET', 'POST', 'DELETE'],
            credentials: true,
            origin: getCors(),
            allowedHeaders: ['Authorization', 'Content-Type'],
        })

        fastify.register(boom)

        loadRoutes(fastify, config, db).then(() =>
            fastify.listen(config.server.port, config.server.host, err => {
                // log the error and terminate execution
                err && log.error(err, 2)

                // log the success and resolve promise
                log.success(
                    `${chalk.whiteBright.bold(
                        '@alpa/api',
                    )} listening at ${chalk.gray.underline(
                        `http://${config.server.host}:${config.server.port}`,
                    )}`,
                )
                resolve()
            }),
        )
    })
