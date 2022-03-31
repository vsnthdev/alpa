/*
 *  Gets application information for docs to be rendered.
 *  Created On 09 March 2022
 */

import path from 'path'
import fs from 'fs/promises'
import dirname from 'es-dirname'

export default async () => {
    const packageJSON = await fs.readFile(path.join(dirname(),  '..', '..', '..', 'package.json'), 'utf-8')
    const { description, license } = JSON.parse(packageJSON)

    return {
        license,
        desc: description
    }
}
