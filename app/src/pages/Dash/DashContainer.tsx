/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import axios from 'axios'
import progress from 'nprogress'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { prepareModalState } from '../../components/CodeModal/functions'
import { DashHero } from '../../components/DashHero/DashHero'
import { AppState } from '../../store'
import { login } from '../../store/auth'
import { insert, update } from '../../store/codes'
import { parseJWTPayload } from '../Login/index'
import { DashContent } from './DashContent'
import logout from './index'

export const Dash = (): ReactElement => {
    const apiToken = localStorage.getItem('apiToken') as string
    const apiHost = localStorage.getItem('apiHost') as string

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const auth = useSelector((app: AppState) => app.auth)

    const [loading, setLoading] = useState(true)
    const [quickText, setQuickText] = useState('')

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

    // fetch new codes upon searching
    const searchAPI = async () => {
        progress.start()
        axios({
            method: 'GET',
            url: `${auth.apiHost}/api/codes?search=${quickText}`,
            headers: {
                Authorization: `Bearer ${auth.apiToken}`,
            },
        })
            .then(({ data }) => {
                dispatch(update(data.codes))
            })
            .finally(() => progress.done())
    }

    return (
        <main>
            <DashHero
                loading={loading}
                quickText={quickText}
                searchAPI={searchAPI}
                modalState={modalState}
                setQuickText={setQuickText}
            ></DashHero>
            <DashContent
                loading={loading}
                quickText={quickText}
                searchAPI={searchAPI}
                modalState={modalState}
                setQuickText={setQuickText}
            ></DashContent>
        </main>
    )
}
