/*
 *  A dev command to watch for file changes and re-build changed
 *  changed files.
 *  Created On 10 March 2022
 */

import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import dirname from 'es-dirname'
import getData from './helpers/index.js'
import handleMarkdownFile from './md.js'

const dir = path.join(dirname(), '..', 'md')
const data = await getData()

const onChange = (p: string) => {
    handleMarkdownFile(p, data)
}

chokidar.watch(dir, {
    ignored: p => {
        const stat = fs.statSync(p)
        
        // allow directories to be watched
        if (stat.isDirectory()) return false

        // only allow markdown files, and rest
        // everything should be ignored
        return path.parse(p).ext != '.md'
    }
})
    .on('add', (p, s) => onChange(p))
    .on('change', (p, s) => onChange(p))
