/*
 *  Gets application information for docs to be rendered.
 *  Created On 09 March 2022
 */

import dirname from 'es-dirname'
import fs from 'fs/promises'
import path from 'path'

export default async () => {
    const packageJSON = await fs.readFile(
        path.join(dirname(), '..', '..', '..', 'package.json'),
        'utf-8',
    )
    const { description, license, engines } = JSON.parse(packageJSON)

    return {
        license,
        desc: description,
        nodeVersion: engines.node.slice(2),
    }
}
