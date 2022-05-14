/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import axios from 'axios'
import progress from 'nprogress'
import { Dispatch, ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { prepareModalState } from '../../components/CodeModal/functions'
import { DashHero } from '../../components/DashHero/DashHero'
import { login } from '../../store/auth'
import { insert } from '../../store/codes'
import { parseJWTPayload } from '../Login/index'
import { DashContent } from './DashContent'
import logout from './index'

export const Dash = ({
    loading,
    quickText,
    setQuickText,
    setLoading,
}: {
    loading: boolean
    quickText: string
    setQuickText: Dispatch<React.SetStateAction<string>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement => {
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // prepare modal's required state
    const modalState = prepareModalState()

    // check if the token is valid, while fetching
    // the codes of using the token
    useEffect(() => {
        progress.start()

        // handle when there's isn't an apiHost
        if (Boolean(apiHost) == false) {
            navigate('/login')
            progress.done()
            return
        }

        axios({
            method: 'GET',
            url: `${apiHost}/api/codes`,
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        })
            .then(({ status, data }) => {
                if (status == 200) {
                    // update our store with the latest
                    // user details
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

                    dispatch(insert(data.codes))
                    setLoading(false)
                } else {
                    logout({
                        auth: {
                            apiHost,
                            apiToken,
                        },
                        dispatch,
                        navigate,
                    })
                }
            })
            .catch(() => {
                logout({
                    auth: {
                        apiHost,
                        apiToken,
                    },
                    dispatch,
                    navigate,
                })
            })
            .finally(() => {
                progress.done()
            })
    }, [])

    return (
        <main>
            <DashHero
                loading={loading}
                quickText={quickText}
                modalState={modalState}
                setQuickText={setQuickText}
            ></DashHero>
            <DashContent
                loading={loading}
                quickText={quickText}
                modalState={modalState}
                setQuickText={setQuickText}
            ></DashContent>
        </main>
    )
}
