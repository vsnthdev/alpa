/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import { createClient, RedisClientType } from 'redis'

import { config } from '../config/index.js'
import { log } from '../logger.js'

export interface ConnectionsList {
    codes: any | null
    tokens: RedisClientType<any> | null
    config: any | null
}

export let db: ConnectionsList

export default async () => {
    const failedConnecting = () =>
        log.error('Failed connecting to the database.', 2)

    const { database } = config

    db = {
        codes: null,
        tokens: null,
        config: null,
    }

    for (const key in db) {
        db[key] = createClient({
            url: database.connection,
            database: database.channels[key],
        })

        db[key].on('error', failedConnecting)

        await db[key].connect()
        await db[key].info()
    }

    log.success(`Connected with the Redis database`)
}
