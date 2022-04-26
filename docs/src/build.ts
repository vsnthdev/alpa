/*
 *  Entryfile to build documentation for alpa project.
 *  Created On 08 March 2022
 */

import dirname from 'es-dirname'
import glob from 'glob'
import path from 'path'

import getData from './helpers/index.js'
import { log } from './logger.js'
import handleMarkdownFile from './md.js'

const getMD = async () => {
    log.info('Estimating markdown files')
    let files = glob.sync(path.join(dirname(), '..', 'md', '**', '**.md'))
    files = files.concat(glob.sync(path.join(dirname(), '..', 'md', '**.md')))

    return files
}

const md = await getMD()
const data = await getData()

const promises = md.map(file => handleMarkdownFile(file, data))

await Promise.all(promises)
log.success('Finished generating docs')
