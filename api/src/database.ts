/*
 *  Connects to the codes Redis database.
 *  Created On 30 January 2022
 */

import { log } from './logger.js';
import { config } from './config/index.js';
import { createClient, RedisClientType, SchemaFieldTypes } from 'redis';
import { app } from './app.js';

export interface ConnectionsList {
    codes: any
    tokens: RedisClientType<any>
}

export let db: ConnectionsList

export const getIndexName = () => 'codes'.concat(app.version.replace(/\./g, ''))

const createSearchIndex = async ({codes }: ConnectionsList) => {
    const indexName = getIndexName()

    const existing = await codes.ft._list()
    if (existing.includes(indexName) == false) {
        // clear all existing indexes
        for (const key of existing) await codes.ft.dropIndex(key, { DD: true })

        await codes.ft.create(
            indexName,
            {
                '$.tags': {
                    type: SchemaFieldTypes.TAG,
                    AS: 'tags',
                    SEPARATOR: ';'
                }
            },
            {
                ON: 'JSON'
            }
        )

        log.info('Created search index for codes')
    }
}

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

    await createSearchIndex(db)
}
