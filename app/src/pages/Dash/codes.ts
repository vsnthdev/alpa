/*
 *  Fetches the short codes accordingly to show on dash.
 *  Created On 18 May 2022
 */

import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import progress from 'nprogress'
import { NavigateFunction } from 'react-router-dom'

import { login } from '../../store/auth'
import { insert, setPages } from '../../store/codes'
import logout from '../../util/logout'
import scrolling from '../../util/scrolling'
import { parseJWTPayload } from '../Login/index'

const fetchCodes = async ({
    getCodesURL,
    apiToken,
    apiHost,
    dispatch,
    navigate,
    setLoading,
}: {
    getCodesURL: () => string
    apiToken: string
    apiHost: string
    dispatch: Dispatch<any>
    navigate: NavigateFunction
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}): Promise<number> => {
    try {
        // fetch the codes
        const { data } = await axios({
            method: 'GET',
            url: getCodesURL(),
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        })

        // if (status != 200) throw new Error('Invalid response status')
        dispatch(setPages(data.pages))
        dispatch(insert(data.codes))
        setLoading(false)
        progress.done()

        return data.pages
    } catch {
        //
        logout({
            auth: {
                apiHost,
                apiToken,
            },
            dispatch,
            navigate,
            setLoading,
        })

        return -1
    }
}

export default async ({
    navigate,
    dispatch,
    page,
    setLoading,
}: {
    dispatch: Dispatch<any>
    navigate: NavigateFunction
    page: [number, any]
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    // start the progress bar
    progress.start()

    // fetch required variables from localStorage
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    // handle when there's isn't an apiHost
    if (Boolean(apiHost) == false) {
        navigate('/login')
        progress.done()
        return
    }

    const getCodesURL = () => `${apiHost}/api/codes?page=${page[0]}`

    const pages = await fetchCodes({
        apiToken,
        getCodesURL,
        apiHost,
        dispatch,
        navigate,
        setLoading,
    })

    // set user's details into the store
    const { username, email } = parseJWTPayload(apiToken)
    dispatch(
        login({
            apiHost,
            apiToken,
            username,
            email,
            isLoggedIn: true,
        }),
    )

    // attach intersection observer
    scrolling({
        dispatch,
        apiHost,
        apiToken,
        pages,
    })
}
