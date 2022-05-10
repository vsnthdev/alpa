/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import { createClient, RedisClientType, SchemaFieldTypes } from 'redis'

import { config } from '../config/index.js'
import { log } from '../logger.js'

export interface ConnectionsList {
    codes: any
    tokens: RedisClientType<any>
    config: any
}

export let db: ConnectionsList

const createSearchIndex = async ({ codes }: ConnectionsList) => {
    const existing = await codes.ft._list()
    if (existing.includes('codes') == false) {
        // clear all existing indexes
        for (const key of existing) await codes.ft.dropIndex(key)

        await codes.ft.create(
            'codes',
            {
                '$.tags': {
                    type: SchemaFieldTypes.TAG,
                    AS: 'tags',
                    SEPARATOR: ';',
                },
            },
            {
                ON: 'JSON',
            },
        )

        log.info('Updating search index for codes')
    }
}

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

    await createSearchIndex(db)
}
