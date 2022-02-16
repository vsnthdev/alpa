/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import { log } from './logger.js';
import { config } from './config/index.js';
import { createClient, RedisClientType } from 'redis';

export interface ConnectionsList {
    codes: any
    tokens: RedisClientType<any>
}

export let db: ConnectionsList

export default async () => {
    const failedConnecting = () => log.error('Failed connecting to the database.', 2)

    const { database } = config

    db = {
        codes: null,
        tokens: null
    }

    for (const key in db) {
        db[key] = createClient({
            url: database.connection,
            database: database.channels[key]
        })

        db[key].on('error', failedConnecting)
    
        await db[key].connect()
        await db[key].info()
    }

    log.success(`Connected with the Redis database`)
}
