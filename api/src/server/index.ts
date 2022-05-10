/*
 *  Sets up & starts Fastify API server.
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

import { config as configFile } from '../config/index.js'
import { AlpaAPIConfig } from '../config/interface'
import config from '../database/config.js'
import { ConnectionsList } from '../database/index.js'
import { db } from '../database/index.js'
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

// fetches all the Cross-Origin allowed
// domains, so that we can allow requests from them
const getCors = async (): Promise<string[]> => {
    const allowed = (await config.get('server.cors')) as string[]

    // automatically allow localhost:3000 during development
    const prod = process.env.NODE_ENV == 'production'
    if (prod == false) allowed.push('http://localhost:3000')

    return allowed
}

const listen = (port, host): Promise<void> =>
    new Promise(resolve => {
        loadRoutes(fastify, configFile, db).then(() =>
            fastify.listen(port, host, err => {
                // log the error and terminate execution
                err && log.error(err, 2)

                // log the success and resolve promise
                log.success(
                    `${chalk.whiteBright.bold(
                        '@alpa/api',
                    )} listening at ${chalk.gray.underline(
                        `http://${host}:${port}`,
                    )}`,
                )
                resolve()
            }),
        )
    })

export default async (): Promise<void> => {
    // get required variables to start the server
    const host = (await config.get('server.host')) as string
    const port = (await config.get('server.port')) as number
    const secret = (await config.get('server.secret')) as string

    // create a new Fastify server
    fastify = Fastify({
        // todo: implement a custom logger, and attach it here
        logger: false,
    })

    // register the JWT plugin
    fastify.register(jwt, {
        secret: secret,
    })

    // register the Cross-Origin Resource Policy plugin
    fastify.register(cors, {
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true,
        origin: await getCors(),
        allowedHeaders: ['Authorization', 'Content-Type'],
    })

    // register the error handling plugin
    fastify.register(boom)

    // start listening for requests from the created Fastify server
    await listen(port, host)
}
