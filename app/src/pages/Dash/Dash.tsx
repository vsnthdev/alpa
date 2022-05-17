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

import { CodeModalStateReturns } from '../../components/CodeModal'
import { login } from '../../store/auth'
import { insert } from '../../store/codes'
import { parseJWTPayload } from '../Login/index'
import { Content } from './Content'
import logout from './index'

export const Dash = ({
    loading,
    quickText,
    setQuickText,
    setLoading,
    modalState,
}: {
    loading: boolean
    quickText: string
    setQuickText: Dispatch<React.SetStateAction<string>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    modalState: CodeModalStateReturns
}): ReactElement => {
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                        setLoading,
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
                    setLoading,
                })
            })
            .finally(() => {
                progress.done()
            })
    }, [])

    return (
        <main>
            <Content
                loading={loading}
                quickText={quickText}
                modalState={modalState}
                setQuickText={setQuickText}
            ></Content>
        </main>
    )
}
