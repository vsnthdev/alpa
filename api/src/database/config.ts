/*
 *  Contains default values for different configs stored in the database.
 *  Created On 10 May 2022
 */

import dot from 'dot-object'

import { db } from './index.js'

const defaults = {
    server: {
        port: 1727,
    },
}

const get = async (key: string): Promise<any> => {
    try {
        return await db.config.json.get('config', {
            path: [`.${key}`],
        })
    } catch {
        return dot.pick(key, defaults)
    }
}

const set = async (change: any): Promise<void> => {
    // fetch existing config
    let current = await db.config.json.get('config')

    // handle when there's no existing config
    if (current == null) current = {}

    // process each config key separately
    for (const key in change) {
        const value = change[key]

        if (value === null) {
            // delete the key in our database
            dot.del(key, current)
        } else {
            // create or update the key in our database
            current = dot.str(key, value, current)
        }
    }

    // write back the updated config
    await db.config.json.set('config', '$', current)
}

export default { get, set }
