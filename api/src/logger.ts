/*
 *  Configures itivrutaha logger module for @alpa/api project.
 *  Created On 30 January 2022
 */

import itivrutaha from 'itivrutaha';
import { Logger } from 'itivrutaha/dist/class';
import chalk from 'chalk';

export default async (): Promise<Logger> => {
    const log = await itivrutaha.createNewLogger({
        appName: '@alpa/api'
    })

    log.note(`Running in ${chalk.whiteBright.bold(process.env.NODE_ENV ? process.env.NODE_ENV : 'development')} mode`)

    return log
}
