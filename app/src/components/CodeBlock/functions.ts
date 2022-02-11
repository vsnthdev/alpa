/*
 *  Contains additional importable functions to work with short codes.
 *  Created On 12 February 2022
 */

import axios from "axios"

interface DelOptions {
    apiHost: string
    apiToken: string
    code: string
    setRender: any
}

export const del = ({ apiHost, apiToken, code, setRender }: DelOptions) => axios({
    method: 'DELETE',
    url: `${apiHost}/api/codes/${code}`,
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
}).then(() => {
    // delete the component
    setRender(false)
})
