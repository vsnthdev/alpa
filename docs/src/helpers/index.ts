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
import { log } from '../logger.js'
import chalk from 'chalk'

export default async () => {
    // get all the files in this directory
    log.info('Starting to fetch data')
    let files = glob.sync(path.join(dirname(), '*.ts'))
    files = files.filter(file => file != files.find(file => path.parse(file).base == 'index.ts'))

    let data = {}

    for (const file of files) {
        log.info(`Fetching for ${chalk.gray(path.parse(file).base)}`)
        const { default: ts } = await import(`file://${file}`)
        data = { ...data, ...await ts() }
    }

    return data
}
