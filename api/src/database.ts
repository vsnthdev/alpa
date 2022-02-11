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

export let db: ConnectionsList

export default async () => {
    const { database } = config
    const base = {
        host: database.host,
        port: database.port,
        password: database.password
    }

    db = {
        codes: null,
        tokens: null
    }

    const failedConnecting = () => log.error('Failed connecting to the database.', 2)

    db.codes = new Redis({ ...base, ...{ db: database.channels.codes } } as any)
    db.tokens = new Redis({ ...base, ...{ db: database.channels.tokens } } as any)
    
    for (const key in db) {
        const conn = db[key] as Redis.Redis
        conn.on('error', failedConnecting)
        await conn.info()
    }

    log.success(`Connected to Redis database at ${chalk.gray.underline(`redis://${base.host}:${base.port}`)}`)
}
