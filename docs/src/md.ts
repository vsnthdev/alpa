/*
 *  Processes each single markdown file.
 *  Created On 09 March 2022
 */

import chalk from 'chalk'
import dirname from 'es-dirname'
import fs from 'fs/promises'
import gm from 'gray-matter'
import handlebars from 'handlebars'
import mkdir from 'mkdirp'
import path from 'path'
import { stringify } from 'yaml'

import getLayout from './layout.js'
import { log } from './logger.js'

const getIsIndex = (md: string) => {
    const relative = path.relative(path.join(dirname(), '..'), md)
    return path.dirname(relative) == 'md' &&
        path.basename(relative) == 'README.md'
        ? true
        : false
}

export default async (md: string, data: any) => {
    // read the file
    const src = await fs.readFile(md, 'utf-8')

    // read the front matter
    const doc = gm(src)

    // fetch the layout if specified
    doc.content = await getLayout(md, doc.data, doc.content)

    // create a YAML template
    handlebars.registerHelper('yaml', (data, indent) =>
        stringify(data)
            .split('\n')
            .map(line => ' '.repeat(indent) + line)
            .join('\n')
            .substring(indent),
    )

    // create a handlebars template
    const template = handlebars.compile(doc.content, {
        noEscape: true,
    })

    // render it
    const render = template({ ...data, ...{ isIndex: getIsIndex(md) } })

    // write to the destination
    const dest = path.join(
        dirname(),
        '..',
        '..',
        path.normalize(md).split(path.join('docs', 'md'))[1],
    )
    await mkdir(path.dirname(dest))
    await fs.writeFile(dest, render, 'utf-8')

    // tell the user, we're finished with this file
    log.info(`Finished writing ${chalk.gray.underline(dest)}`)
}
