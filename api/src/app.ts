/*
 *  Reads the package.json file and exposes the values
 *  as variables to be accessed in the program.
 *  Created On 17 February 2022
 */

import dirname from 'es-dirname'
import { readFile } from 'fs/promises'
import { join } from 'path'

interface PackageJSON {
    name: string
    description: string
    version: string
}

export let app: PackageJSON

export default async () => {
    app = JSON.parse(
        await readFile(join(dirname(), '..', 'package.json'), 'utf-8'),
    )
}
