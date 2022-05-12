/*
 *  Contains utility function to fetch the CORS domains.
 *  Created On 12 May 2022
 */

import config from '../database/config.js'

// fetches all the Cross-Origin allowed
// domains, so that we can allow requests from them
export default async (): Promise<string[]> => {
    const allowed = ((await config.get('server.cors')) || []) as string[]

    // automatically allow localhost:3000 during development
    const prod = process.env.NODE_ENV == 'production'
    if (prod == false) allowed.push('http://localhost:3000')

    return allowed
}
