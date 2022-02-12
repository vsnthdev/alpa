/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import { ReactElement, useState, useEffect, Dispatch } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DashContent } from './DashContent';
import progress from 'nprogress';
import { parseJWTPayload } from '../Login/index';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth';
import { AppState } from '../../store';
import { insert } from '../../store/codes';
import logout from '.';

export const Dash = (): ReactElement => {
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(true)
    const codes = useSelector((state: AppState) => state.codes)

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

                dispatch(insert(data.codes))
                setLoading(false)
            } else {
                logout({
                    auth: {
                        apiHost,
                        apiToken
                    },
                    dispatch,
                    navigate
                })
            }
        }).catch(err => {
            logout({
                auth: {
                    apiHost,
                    apiToken
                },
                dispatch,
                navigate
            })
        })
    }, [])

    return <main>
        { loading == false
        ? <DashContent></DashContent>
        : "" }
    </main>
}
