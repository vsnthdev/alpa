/*
 *  Contains additional importable functions to work with short codes.
 *  Created On 12 February 2022
 */

import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

import { Code, del as _del } from '../../store/codes'

export const del = ({
    apiHost,
    apiToken,
    code,
    dispatch,
}: {
    apiHost: string
    apiToken: string
    code: string
    dispatch: Dispatch
}) =>
    axios({
        method: 'DELETE',
        url: `${apiHost}/api/codes/${code}`,
        headers: {
            Authorization: `Bearer ${apiToken}`,
        },
    }).then(() => {
        // update our application state
        dispatch(_del(code))
    })

export const copyShortURL = ({
    code,
    apiHost,
    setShowCopiedToolTip,
}: {
    code: Code
    apiHost: string
    setShowCopiedToolTip: React.Dispatch<React.SetStateAction<boolean>>
}) =>
    navigator.clipboard.writeText(`${apiHost}/${code.code}`).then(() => {
        setShowCopiedToolTip(true)
        setTimeout(() => setShowCopiedToolTip(false), 1000)
    })

// copied from 👇
// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export const getColorFromTag = (tag: string) => {
    const stringUniqueHash = [...tag].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    return `hsla(${stringUniqueHash % 360}, 95%, 35%, 0.15)`
}
