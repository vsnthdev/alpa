/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import { ReactElement, useState, useEffect, Dispatch } from 'react';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { DashContent } from './DashContent';
import progress from 'nprogress';
import { parseJWTPayload } from '../Login/Login';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/auth';

interface CodeLink {
    url: string
}

export interface Code {
    code: string
    links: CodeLink[]
    tags: string[]
}

export interface CodeResponse {
    codes: Code[]
    loading: boolean
}

interface PushBackToLoginOptions {
    apiHost: string
    apiToken: string
    navigate: NavigateFunction
    dispatch: Dispatch<any>
}

export const pushBackToLogin = ({ apiHost, apiToken, navigate, dispatch }: PushBackToLoginOptions) => {
    // the logout procedure
    const procedure = () => {
        // delete the token from the browser
        localStorage.removeItem('apiToken')
        
        // reset our app store
        dispatch(logout())

        // go back to login page
        navigate('/')
        progress.done()
    }

    progress.start()
    axios({
        method: 'DELETE',
        url: `${apiHost}/api/auth/logout`,
        headers: {
            Authorization: `Bearer ${apiToken}`
        }
    }).then(() => procedure()).catch(e => {
        // if the token is no longer authorized, we simply
        // clean up the token and redirect to login page
        if (JSON.parse(JSON.stringify(e)).status == 401) procedure()
    })
    
}

export const Dash = ({ setIsLoggedIn }: { setIsLoggedIn: any }): ReactElement => {
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(true)
    const [ codes, setCodes ] = useState({ codes: [], loading: true } as CodeResponse)

    // check if the token is valid, while fetching
    // the codes of using the token
    useEffect(() => {
        progress.start()
        axios({
            method: 'GET',
            url: `${apiHost}/api/codes`,
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        }).then(({status, data}) => {
            if (status == 200) {
                // update our store with the latest
                // user details
                const { username, email } = parseJWTPayload(apiToken)
                dispatch(login({
                    apiHost,
                    apiToken,
                    username,
                    email,
                    isLoggedIn: true,
                }))

                setCodes(data)
                setLoading(false)
            } else {
                pushBackToLogin({apiHost, apiToken, navigate, dispatch})
            }
        }).catch(err => {
            pushBackToLogin({apiHost, apiToken, navigate, dispatch})
        })
    }, [])

    return <main>
        { loading == false
        ? <DashContent apiHost={apiHost} apiToken={apiToken} codes={codes}></DashContent>
        : "" }
    </main>
}
