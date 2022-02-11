/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DashContent } from './DashContent';
import progress from 'nprogress';

export interface Code {
    code: string
}

export interface CodeResponse {
    codes: Code[]
    loading: boolean
}

export const Dash = (): ReactElement => {
    const apiToken = localStorage.getItem('apiToken')
    const apiHost = localStorage.getItem('apiHost')

    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    const [ codes, setCodes ] = useState({ codes: [], loading: true } as CodeResponse)

    const pushBackToLogin = () => {
        localStorage.removeItem('apiToken')
        navigate('/')
        progress.done()
    }

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
            } else {
                pushBackToLogin()
            }
        }).catch(err => {
            pushBackToLogin()
        })
    }, [])

    return <main>
        { loading == false
        ? <DashContent codes={codes}></DashContent>
        : "" }
    </main>
}
