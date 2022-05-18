/*
 *  A container component that will check if JWT is valid and redirect
 *  to login if not, or else loads the Dashboard content.
 *  Created On 08 February 2022
 */

import { Dispatch, ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CodeModalStateReturns } from '../../components/CodeModal'
import getCodes from './codes'
import { Content } from './Content'

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
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // create any states, helper functions required for functioning
    const page = useState(0)

    useEffect(() => {
        getCodes({ navigate, dispatch, page, setLoading })
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
