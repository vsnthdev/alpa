/*
 *  Contains default values for different configs stored in the database.
 *  Created On 10 May 2022
 */

import merge from 'deepmerge'
import dot from 'dot-object'

import { db } from './index.js'

const defaults = {
    server: {
        host: process.env.NODE_ENV != 'production' ? '0.0.0.0' : 'localhost',
        port: 1727,
        secret: '3PWSzUzBRA722PdnyFwzVrXbangmFsQkLe98jjaEnDw9o8cW7fcWNkURc92GB5SF',
        cors: [],
    },
}

const get = async (key: string): Promise<any> => {
    try {
        const inDb = (await db.config.json.get('config', {
            path: [`.${key}`],
        })) as string

        return inDb == null ? dot.pick(key, defaults) : inDb
    } catch {
        return dot.pick(key, defaults)
    }
}

const deleteKeys = (change: any, current: any) => {
    const dotted = dot.dot(change)
    const toDelete = Object.keys(dotted).filter(key => dotted[key] == null)

    for (const key of toDelete) {
        dot.delete(key, current)
        dot.delete(key, change)
    }
}

const set = async (change: any): Promise<void> => {
    // fetch existing config
    let current = await db.config.json.get('config')

    // handle when there's no existing config
    if (current == null) current = {}

    // remove any nulls, and undefined values
    deleteKeys(change, current)

    // merge both the updated one with full config
    // to get the final config object
    const overwriteMerge = (destinationArray, sourceArray) => sourceArray
    current = merge(change, current, {
        arrayMerge: overwriteMerge,
    })

    // write back the updated config
    await db.config.json.set('config', '$', current)
}

export default { get, set }
