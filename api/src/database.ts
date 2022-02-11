/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import Redis from 'ioredis'
import { log } from './logger.js';
import { config } from './config/index.js';
import chalk from 'chalk';

export interface ConnectionsList {
    codes: Redis.Redis
    tokens: Redis.Redis
}

export default async () => {
    const { database } = config
    const base = {
        host: database.host,
        port: database.port,
        password: database.password
    }

    const conn: ConnectionsList = {
        codes: null,
        tokens: null
    }

    const failedConnecting = () => log.error('Failed connecting to the database.', 2)

    conn.codes = new Redis({ ...base, ...{ db: database.channels.codes } } as any)
    conn.tokens = new Redis({ ...base, ...{ db: database.channels.tokens } } as any)
    
    for (const key in conn) {
        const db = conn[key] as Redis.Redis
        db.on('error', failedConnecting)
        await db.info()
    }

    log.success(`Connected to Redis database at ${chalk.gray.underline(`redis://${base.host}:${base.port}`)}`)
    return conn
}
