/*
 *  Contains utility functions used across the @alpa/docs project.
 *  Created On 08 March 2022
 */

import path from 'path'
import chalk from 'chalk'
import fs from 'fs/promises'
import dirname from 'es-dirname'
import itivrutaha from 'itivrutaha'

const logger = await itivrutaha.createNewLogger({
    bootLog: false,
    shutdownLog: false,
    theme: {
        string: ':emoji :type :message'
    }
})

interface ReadStruct {
    name: string
    in: string
    out: string
}

export const read = async (config: ReadStruct): Promise<string> => {
    logger.info(`Reading template for ${config.name}`)
    return await fs.readFile(path.join(dirname(), config.in), 'utf-8')
}

export const write = async (config: ReadStruct, data: string): Promise<void> => {
    const dest = path.join(dirname(), config.out)

    logger.note(`Writing ${chalk.gray.underline(dest)}`)
    await fs.writeFile(dest, data.trim().concat('\n'), 'utf-8')
    logger.success(`Finished processing ${config.name}`)
}

export const generics = async (template: string): Promise<string> => {
    const app = JSON.parse(await fs.readFile(path.join(dirname(), '..', '..', 'package.json'), 'utf-8'))
    const date = new Date()

    return template
        .replace(/<!-- desc -->/g, app.description)
        .replace(/<!-- license -->/g, app.license)
        .replace(/<!-- year -->/g, date.getFullYear().toString())
}
