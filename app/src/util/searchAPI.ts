/*
 *  Searches the api provided authentication details.
 *  Created On 14 May 2022
 */

import axios from 'axios'
import progress from 'nprogress'

import { AuthState } from '../store/auth'
import { update } from '../store/codes'

// fetch new codes upon searching
export const searchAPI = ({
    auth,
    dispatch,
    quickText,
}: {
    auth: AuthState
    quickText: string
    dispatch: any
}): Promise<boolean> =>
    new Promise((resolve, reject) => {
        progress.start()
        axios({
            method: 'GET',
            url: `${auth.apiHost}/api/codes?search=${encodeURIComponent(
                quickText,
            )}`,
            headers: {
                Authorization: `Bearer ${auth.apiToken}`,
            },
        })
            .then(({ data }) => {
                dispatch(update(data.codes))
                resolve(true)
            })
            .catch(err => reject(err))
            .finally(() => progress.done())
    })
