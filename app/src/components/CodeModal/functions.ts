/*
 *  This file contains functions, to prepare and handle the state
 *  of the CodeModal component. But these functions should be invoked
 *  in the parent component. Not in CodeModal itself.
 *  Created On 13 February 2022
 */

import { useState } from 'react';

export interface CodeModalStateReturns {
    code: string
    isOpen: boolean
    setCode: React.Dispatch<React.SetStateAction<string>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const prepareModalState = (): CodeModalStateReturns => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [code, setCode] = useState("")

    return { code, setCode, isOpen, setIsOpen }
}

export const openCodeModal = (code: string, state: CodeModalStateReturns) => {
    // set the code
    state.setCode(code)

    // fetch additional data from the app store
    // fill other states

    // show the modal
    state.setIsOpen(true)
}

const closeModal = (state: CodeModalStateReturns) => state.setIsOpen(false)

const clearState = (state: CodeModalStateReturns) => setTimeout(() => {
    state.setCode("")
}, 500)

export const cancelAction = (state: CodeModalStateReturns) => {
    closeModal(state)
    clearState(state)
}

export const applyAction = (state: CodeModalStateReturns) => {
    closeModal(state)
    // todo: send HTTP request
    // todo: dispatch a app store change
    clearState(state)
}
