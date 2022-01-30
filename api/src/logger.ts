/*
 *  Configures itivrutaha logger module for @alpa/api project.
 *  Created On 30 January 2022
 */

import itivrutaha from 'itivrutaha';

export let log

export default async (): Promise<void> => {
    log = await itivrutaha.createNewLogger({
        appName: '@alpa/api'
    })
}
