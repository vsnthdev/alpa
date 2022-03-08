/*
 *  Loads all the helpers and returns the data object.
 *  Created On 09 March 2022
 */

// helpers directory would contain folders containing
// TypeScript modules, that would dynamically interpret
// parts of the codebase to create variables to be used dynamically
// throughout the markdown files

import glob from 'glob'
import path from 'path'
import dirname from 'es-dirname'

export default async () => {
    // get all the files in this directory
    const files = glob.sync(path.join(dirname(), '*.ts'))
    files.splice(files.indexOf(path.join(dirname(), 'index.ts')), 1)

    let data = {}

    for (const file of files) {
        const { default: ts } = await import(`file://${file}`)
        data = { ...data, ...await ts() }
    }

    return data
}
