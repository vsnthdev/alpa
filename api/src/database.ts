/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import Redis from 'ioredis'
import { Logger } from 'itivrutaha/dist/class'
import { AlpaAPIConfig } from './config/interface.js'
import chalk from 'chalk';

export interface ConnectionsList {
    codes: Redis.Redis
}

export default async (log: Logger, { database }: AlpaAPIConfig) => {
    const base = {
        host: database.host,
        port: database.port,
        password: database.password
    }

    const conn: ConnectionsList = {
        codes: null
    }

    const failedConnecting = () => log.error('Failed connecting to the database.', 2)

    conn.codes = new Redis({ ...base, ...{ db: database.channels.codes } } as any)
    
    for (const key in conn) {
        const db = conn[key] as Redis.Redis
        db.on('error', failedConnecting)
        await db.info()
    }

    log.success(`Connected to Redis database at ${chalk.gray.underline(`redis://${base.host}:${base.port}`)}`)
    return conn
}
