/*
 *  Initializes itivrutaha logger for @alpa/docs project.
 *  Created On 08 March 2022
 */

import itivrutaha from 'itivrutaha'

export const log = await itivrutaha.createNewLogger({
    bootLog: false,
    shutdownLog: false,
    theme: {
        string: ':emoji :type :message'
    }
})
