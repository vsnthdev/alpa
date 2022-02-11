/*
 *  Reads the configuration file in the root directory.
 *  Created On 30 January 2022
 */

import chalk from 'chalk';
import fs from 'fs/promises'
import path from 'path'
import dirname from 'es-dirname'
import { promise } from '@vsnthdev/utilities-node';
import yaml from 'js-yaml';

import type { AlpaAPIConfig } from './interface.js'
import { log } from '../logger.js';

export default async (): Promise<AlpaAPIConfig> => {
    const loc = path.join(dirname(), '..', '..', 'config.yml')

    const { err, returned: str } = await promise.handle(
        fs.readFile(loc, 'utf-8')
    )

    err && log.error(`Could not read config file at :point_down:\n${chalk.gray.underline(loc)}\n`, 2)

    try {
        return yaml.load(str) as AlpaAPIConfig
    } catch {
        log.error('Failed to parse config file. Read from :point_down:\n${chalk.gray.underline(loc)}\n', 2)
    }
}

