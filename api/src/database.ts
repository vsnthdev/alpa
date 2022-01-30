/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import Redis from 'ioredis'
import { Logger } from 'itivrutaha/dist/class'
import { AlpaAPIConfig } from './config/interface.js'
import chalk from 'chalk';

export default (log: Logger, { database }: AlpaAPIConfig) => {
    const base = {
        host: database.host,
        port: database.port,
        password: database.password
    }

    const conn = {
        codes: new Redis({ ...base, ...{ db: database.channels.codes } } as any)
    }

    log.success(`Connected to Redis database at ${chalk.gray.underline(`redis://${base.host}:${base.port}`)}`)

    return conn
}
