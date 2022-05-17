/*
 *  This file contains functions, to prepare and handle the state
 *  of the CodeModal component. But these functions should be invoked
 *  in the parent component. Not in CodeModal itself.
 *  Created On 13 February 2022
 */

import axios from 'axios'
import isMobile from 'is-mobile'
import { customAlphabet } from 'nanoid'
import { Dispatch, useState } from 'react'

import { AuthState } from '../../store/auth'
import { Code, patch } from '../../store/codes'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 4)

export interface CodeModalStateReturns {
    code: Code
    isOpen: boolean
    isCreatingNew: boolean
    setCode: React.Dispatch<React.SetStateAction<Code>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsCreatingNew: React.Dispatch<React.SetStateAction<boolean>>
}

export const prepareModalState = (): CodeModalStateReturns => {
    const [isOpen, setIsOpen] = useState(false)
    const [isCreatingNew, setIsCreatingNew] = useState(false)

    const [code, setCode] = useState({
        code: '',
        links: [
            {
                url: '',
            },
        ],
        tags: '',
    } as Code)

    return { code, setCode, isOpen, setIsOpen, isCreatingNew, setIsCreatingNew }
}

export const openCodeModal = (
    code: Code | null,
    state: CodeModalStateReturns,
) => {
    // function to focus on our target input field
    const focus = () =>
        (document.querySelector('#target') as HTMLInputElement).focus()

    // set the code if we're editing
    // an existing one, or else set as a new code dialog
    if (code) {
        state.setIsCreatingNew(false)
        state.setCode({
            ...code,
            ...{
                tags: code.tags
                    .split(';')
                    .map(tag => tag.trim())
                    .filter(tag => Boolean(tag))
                    .join('; '),
            },
        } as Code)
    } else {
        state.setCode({
            ...state.code,
            ...{ code: generateCodeString() },
        } as Code)
        state.setIsCreatingNew(true)
    }

    // show the modal & set focus on target
    state.setIsOpen(true)
    isMobile() ? (document.activeElement as HTMLElement).blur() : focus()
}

const closeModal = (state: CodeModalStateReturns) => state.setIsOpen(false)

const clearState = (state: CodeModalStateReturns) =>
    state.setCode({
        code: '',
        links: [{ url: '' }],
        tags: '',
    })

export const cancelAction = (state: CodeModalStateReturns) => {
    closeModal(state)
    clearState(state)
    ;(document.querySelector('#btnNew') as any).focus()
}

export const applyAction = (
    state: CodeModalStateReturns,
    dispatch: Dispatch<any>,
    auth: AuthState,
) => {
    closeModal(state)

    // prepare a final new Code object
    const getTags = (tags: string) =>
        tags
            .split(';')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)
            .join(';')
    const final = { ...state.code, ...{ tags: getTags(state.code.tags) } }

    // send HTTP request
    axios({
        method: 'POST',
        url: `${auth.apiHost}/api/codes?force=true`,
        headers: {
            Authorization: `Bearer ${auth.apiToken}`,
        },
        data: final,
    }).then(() => {
        // dispatch a app store change
        dispatch(patch(final))
    })

    clearState(state)
}

export const generateCodeString = (): string => nanoid()
