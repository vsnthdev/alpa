/*
 *  Primarily does two things:
 *  1. Makes sure every short code is added into the sorted array
 *     for querying.
 *  2. Makes sure that non-existing short codes are removed from sorted
 *     array to maintain a smaller footprint.
 *  Created On 20 May 2022
 */

import { log } from '../../../logger.js'
import { db } from '../../index.js'

// picked up from 👇
// https://stackoverflow.com/questions/44855276/how-do-i-split-a-number-into-chunks-of-max-100-in-javascript
const getChunks = (total: number, chunkSize: number) =>
    Array.from(
        { length: Math.ceil(total / chunkSize) },
        (_: unknown, k: number) => {
            const leftOver = total - k * 100
            return leftOver > 100 ? 100 : leftOver
        },
    )

// goes through every sorted array and checks if a key of that
// name actually exists, if not it deletes the entry from sorted array
const cleanUpSortedArray = async (): Promise<void> => {
    const total: number = await db.config.zCount('codes', '-inf', '+inf')
    const chunks = getChunks(total, 100)

    let start = 0
    for (const chunk of chunks) {
        const end = start + chunk

        const keys = await db.config.zRange('codes', start, end)

        for (const key of keys) {
            const exists = Boolean(await db.codes.exists(key))

            if (!exists) {
                await db.config.zRem('codes', key)
            }
        }

        start += chunk
    }
}

const populateSortedArray = async (): Promise<void> => {
    // fetch the section from the database
    let cursor = 100
    const previousCursors: number[] = []
    // eslint-disable-next-line no-constant-condition
    while (1) {
        const { keys, cursor: nextCursor } = await db.codes.scan(cursor)
        cursor = nextCursor

        if (previousCursors.includes(cursor)) break

        for (const key of keys) {
            // fetch the last value in sorted list and it's score
            let lastScore: number
            try {
                const [last] = await db.config.zRangeWithScores('codes', 0, 0, {
                    REV: true,
                })

                lastScore = last.score
            } catch {
                lastScore = 0
            }

            // add the newly created code to our sorted set
            await db.config.zAdd('codes', { score: lastScore + 1, value: key })
        }

        previousCursors.push(cursor)
    }
}

export default async (): Promise<void> => {
    // perform both operations at the same time in async
    await Promise.all([cleanUpSortedArray(), populateSortedArray()])

    log.info('Sorted array reflection finished')
}
