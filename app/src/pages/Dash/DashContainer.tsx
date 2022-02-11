/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { DashContent } from './DashContent';
import progress from 'nprogress';

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
    setIsLoggedIn: any
}

export const pushBackToLogin = ({ apiHost, apiToken, navigate, setIsLoggedIn }: PushBackToLoginOptions) => {
    progress.start()
    axios({
        method: 'DELETE',
        url: `${apiHost}/api/auth/logout`,
        headers: {
            Authorization: `Bearer ${apiToken}`
        }
    }).then(() => {
        localStorage.removeItem('apiToken')
        setIsLoggedIn(false)
        navigate('/')
        progress.done()
    })
    
}

export const Dash = ({ setIsLoggedIn }: { setIsLoggedIn: any }): ReactElement => {
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    const navigate = useNavigate()
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
                setCodes(data)
                setLoading(false)
                setIsLoggedIn(true)
            } else {
                pushBackToLogin({apiHost, apiToken, navigate, setIsLoggedIn})
            }
        }).catch(err => {
            pushBackToLogin({apiHost, apiToken, navigate, setIsLoggedIn})
        })
    }, [])

    return <main>
        { loading == false
        ? <DashContent codes={codes}></DashContent>
        : "" }
    </main>
}
