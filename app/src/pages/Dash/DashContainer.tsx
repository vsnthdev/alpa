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

export const Dash = (): ReactElement => {
    const apiToken = localStorage.getItem('apiToken')
    const apiHost = localStorage.getItem('apiHost')
    const navigate = useNavigate()
    const [ profile, setProfile ] = useState({} as any)

    const pushBackToLogin = () => {
        localStorage.removeItem('apiToken')
        navigate('/')
        progress.done()
    }

    // check if the token is valid, while fetching
    // the user info on load
    useEffect(() => {
        progress.start()
        axios({
            method: 'GET',
            url: `${apiHost}/api/auth`,
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        }).then(({status, data}) => {
            if (status == 200) {
                setProfile(data)
            } else {
                pushBackToLogin()
            }
        }).catch(err => {
            pushBackToLogin()
        })
    }, [])

    return <main>
        { Object.keys(profile).length > 0
        ? <DashContent profile={profile}></DashContent>
        : "" }
    </main>
}
