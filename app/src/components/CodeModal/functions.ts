/*
 *  This file contains functions, to prepare and handle the state
 *  of the CodeModal component. But these functions should be invoked
 *  in the parent component. Not in CodeModal itself.
 *  Created On 13 February 2022
 */

import { Dispatch, useState } from 'react';
import { Code, patch } from '../../store/codes';
import axios from 'axios';
import { AuthState } from '../../store/auth';

export interface CodeModalStateReturns {
    code: Code
    isOpen: boolean
    setCode: React.Dispatch<React.SetStateAction<Code>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const prepareModalState = (): CodeModalStateReturns => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [code, setCode] = useState({
        code: '',
        links: [
            {
                url: ''
            }
        ],
        tags: ''
    } as Code)

    return { code, setCode, isOpen, setIsOpen }
}

export const openCodeModal = (code: Code, state: CodeModalStateReturns) => {
    // function to focus on our target input field
    const focus = () => (document.querySelector('#target') as HTMLInputElement).focus()

    // set the code
    state.setCode(code)

    // show the modal & set focus on target
    state.setIsOpen(true)
    focus()
}

const closeModal = (state: CodeModalStateReturns) => state.setIsOpen(false)

const clearState = (state: CodeModalStateReturns) => setTimeout(() => {
    state.setCode({
        code: '',
        links: [{ url: '' }],
        tags: ''
    })
}, 500)

export const cancelAction = (state: CodeModalStateReturns) => {
    closeModal(state)
    clearState(state)
}

export const applyAction = (state: CodeModalStateReturns, dispatch: Dispatch<any>, auth: AuthState) => {
    closeModal(state)

    // prepare a final new Code object
    const getTags = (tags: string | string[]) => typeof tags == 'string' ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : tags
    const final = { ...state.code, ...{ tags: getTags(state.code.tags) } }

    // send HTTP request
    axios({
        method: 'POST',
        url: `${auth.apiHost}/api/codes?force=true`,
        headers: {
            Authorization: `Bearer ${auth.apiToken}`
        },
        data: final
    }).then(() => {
        // dispatch a app store change
        dispatch(patch(final))
    })

    clearState(state)
}
