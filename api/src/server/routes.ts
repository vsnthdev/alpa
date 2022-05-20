/*
 *  Contains function to dynamically load the routes.
 *  Created On 12 May 2022
 */

import dirname from 'es-dirname'
import {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifySchema,
    RouteOptions,
} from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import glob from 'glob'
import { IncomingMessage, Server, ServerResponse } from 'http'
import path from 'path'

type FastifyImpl = FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
>

interface RouteOptionsImpl
    extends Omit<
        RouteOptions<
            Server,
            IncomingMessage,
            ServerResponse,
            RouteGenericInterface,
            unknown,
            FastifySchema
        >,
        'url'
    > {
    url: string[]
}

const addRoute = async (fastify: FastifyImpl, file: string) => {
    // dynamically import the route file
    const { default: route }: { default: RouteOptionsImpl } = await import(
        `file://${file}`
    )

    for (const url of route.url) {
        fastify.route({ ...route, ...{ url } })
    }
}

export default async (fastify: FastifyImpl): Promise<void> => {
    // get all the route files
    const dir = path.join(dirname(), 'routes', '**', 'index.js')
    const files = glob.sync(dir, {
        nodir: true,
        noext: true,
    })

    // load each single route by processing it
    // before attaching to the fastify server
    const promises: Promise<void>[] = []
    for (const file of files) {
        // process each route in async
        // for better startup
        promises.push(addRoute(fastify, file))
    }

    // wait until all the route adding promises are finished
    await Promise.all(promises)
}
