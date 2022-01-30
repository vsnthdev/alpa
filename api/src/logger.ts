/*
 *  Configures itivrutaha logger module for @alpa/api project.
 *  Created On 30 January 2022
 */

import itivrutaha from 'itivrutaha';
import { Logger } from 'itivrutaha/dist/class';

export default async (): Promise<Logger> => await itivrutaha.createNewLogger({
    appName: '@alpa/api'
})
