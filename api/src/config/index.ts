/*
 *  Reads the configuration file in the root directory.
 *  Created On 30 January 2022
 */

import { promise } from '@vsnthdev/utilities-node'
import chalk from 'chalk'
import dirname from 'es-dirname'
import fs from 'fs/promises'
import path from 'path'
import { parse } from 'yaml'

import { log } from '../logger.js'
import type { AlpaAPIConfig } from './interface.js'

export let config: AlpaAPIConfig

export default async (): Promise<void> => {
    const loc = path.join(dirname(), '..', '..', 'config.yml')

    const { err, returned: str } = await promise.handle(
        fs.readFile(loc, 'utf-8'),
    )

    err &&
        log.error(
            `Could not read config file at :point_down:\n${chalk.gray.underline(
                loc,
            )}\n`,
            2,
        )

    try {
        config = parse(str) as AlpaAPIConfig
    } catch {
        log.error(
            'Failed to parse config file. Read from :point_down:\n${chalk.gray.underline(loc)}\n',
            2,
        )
    }
}
