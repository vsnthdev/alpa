/*
 *  Unified procedure to login a user with the given credentials.
 *  Created On 12 February 2022
 */

import axios from 'axios'
import progress from 'nprogress'
import { NavigateFunction } from 'react-router-dom'

interface LoginOptions {
    navigate: NavigateFunction
    apiHost: string
    credentials: {
        username: string
        password: string
    }
}

export const openDashboard = (navigate: NavigateFunction) =>
    navigate('/', {
        replace: true,
    })

export const parseJWTPayload = (token: string) => {
    const base64Url: string = token.split('.')[1]
    const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload: any = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join(''),
    )

    return JSON.parse(jsonPayload)
}

export default async ({ apiHost, credentials, navigate }: LoginOptions) => {
    const { username, password } = credentials

    progress.start()

    try {
        const { status, data } = await axios({
            method: 'POST',
            url: `${apiHost}/api/auth/login`,
            data: {
                username,
                password,
            },
        })

        if (status == 200) {
            localStorage.setItem('apiToken', data.token)
            openDashboard(navigate)
        }
    } catch {
        console.log('failed login attempt')
        progress.done()
    }
}
