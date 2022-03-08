/*
 *  Contains utility functions used across the @alpa/docs project.
 *  Created On 08 March 2022
 */

import path from 'path'
import fs from 'fs/promises'
import dirname from 'es-dirname'

interface ReadStruct {
    in: string
    out: string
}

export const read = async (config: ReadStruct): Promise<string> => 
    await fs.readFile(path.join(dirname(), config.in), 'utf-8')

export const write = async (config: ReadStruct, data: string): Promise<void> =>
    await fs.writeFile(path.join(dirname(), config.out), data.trim().concat('\n'), 'utf-8')

export const generics = (template: string): string => {
    const date = new Date()

    return template
        .replace(/<!-- year -->/g, date.getFullYear().toString())
}
