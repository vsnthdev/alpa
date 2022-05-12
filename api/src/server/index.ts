/*
 *  Sets up & starts Fastify API server.
 *  Created On 30 January 2022
 */

import chalk from 'chalk'
import Fastify, { FastifyInstance } from 'fastify'
import boom from 'fastify-boom'
import cors from 'fastify-cors'
import jwt from 'fastify-jwt'

import config from '../database/config.js'
import { log } from '../logger.js'
import getCors from './cors.js'
import getRoutes from './routes.js'

export let fastify: FastifyInstance

const listen = (port, host): Promise<void> =>
    new Promise(resolve => {
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
        })
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

    // dynamically load our routes
    await getRoutes(fastify)

    // start listening for requests from the created Fastify server
    await listen(port, host)
}
