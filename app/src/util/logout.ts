/*
 *  Unified procedure to logout the authenticated user.
 *  Created On 12 February 2022
 */

import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import progress from 'nprogress'
import { NavigateFunction } from 'react-router-dom'

import { logout } from '../store/auth'
import { clear } from '../store/codes'

interface LogoutOptions {
    auth: {
        apiHost: string
        apiToken: string
    }
    navigate: NavigateFunction
    dispatch: Dispatch<any>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default ({ auth, navigate, dispatch, setLoading }: LogoutOptions) => {
    const { apiHost, apiToken } = auth

    // the logout procedure
    const procedure = () => {
        // delete the token from the browser
        localStorage.removeItem('apiToken')

        // reset our app store
        dispatch(logout())
        dispatch(clear())

        // go back to login page
        navigate('/login')
        progress.done()

        // set the loading state back to true
        setLoading(true)
    }

    progress.start()
    axios({
        method: 'DELETE',
        url: `${apiHost}/api/auth/logout`,
        headers: {
            Authorization: `Bearer ${apiToken}`,
        },
    })
        .then(() => procedure())
        .catch(e => {
            // if the token is no longer authorized, we simply
            // clean up the token and redirect to login page
            if (JSON.parse(JSON.stringify(e)).status == 401) procedure()
            if (JSON.parse(JSON.stringify(e)).status == 500) procedure()
        })
        .finally(() => {
            progress.done()
        })
}
