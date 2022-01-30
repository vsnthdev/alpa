/*
 *  Sets up fastify API server.
 *  Created On 30 January 2022
 */

import Fastify from 'fastify';
import { Logger } from 'itivrutaha/dist/class';
import { AlpaAPIConfig } from '../config/interface';
import chalk from 'chalk';

export default async (log: Logger, { server }: AlpaAPIConfig): Promise<void> => new Promise((resolve, reject) => {
    const fastify = Fastify({
        // TODO: implement a custom logger, and attach it here
        logger: false
    })

    fastify.listen(server.port, server.host, (err, address) => {
        log.success(`${chalk.whiteBright.bold('@alpa/api')} listening at ${chalk.gray.underline(`http://${server.host}:${server.port}`)}`)
        resolve()
    })
})
