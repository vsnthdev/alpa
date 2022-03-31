/*
 *  Processes each single markdown file.
 *  Created On 09 March 2022
 */

import chalk from 'chalk'
import path from 'path'
import fs from 'fs/promises'
import gm from 'gray-matter'
import dirname from 'es-dirname'
import handlebars from 'handlebars'
import getLayout from './layout.js'
import { log } from './logger.js'
import mkdir from 'mkdirp'

const getIsIndex = (md: string) => {
    const relative = path.relative(path.join(dirname(), '..'), md)
    return (path.dirname(relative) == 'md' && path.basename(relative) == 'README.md') ? true : false
}

export default async (md: string, data: any) => {
    // read the file
    const src = await fs.readFile(md, 'utf-8')

    // read the front matter
    let { data: context, content } = gm(src)

    // fetch the layout if specified
    content = await getLayout(md, context, content)

    // create a handlebars template
    const template = handlebars.compile(content)

    // render it
    const render = template({ ...data, ...{ isIndex: getIsIndex(md) } })

    // write to the destination
    const dest = path.join(dirname(), '..', '..', path.normalize(md).split(path.join('docs', 'md'))[1])
    await mkdir(path.dirname(dest))
    await fs.writeFile(dest, render, 'utf-8')

    // tell the user, we're finished with this file
    log.info(`Finished writing ${chalk.gray.underline(dest)}`)
}
