/*
 *  Creates a search index every time the program starts.
 *  Created On 20 May 2022
 */

import { SchemaFieldTypes } from 'redis'

import { log } from '../../../logger.js'
import { db } from '../../index.js'

export default async () => {
    const { codes } = db

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
