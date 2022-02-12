/*
 *  Contains additional importable functions to work with short codes.
 *  Created On 12 February 2022
 */

import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { del as _del } from '../../store/codes';

interface DelOptions {
    apiHost: string
    apiToken: string
    code: string
    dispatch: Dispatch
}

export const del = ({ apiHost, apiToken, code, dispatch }: DelOptions) => axios({
    method: 'DELETE',
    url: `${apiHost}/api/codes/${code}`,
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
}).then(() => {
    // update our application state
    dispatch(_del({ code }))
})
