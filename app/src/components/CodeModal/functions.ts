/*
 *  This file contains functions, to prepare and handle the state
 *  of the CodeModal component. But these functions should be invoked
 *  in the parent component. Not in CodeModal itself.
 *  Created On 13 February 2022
 */

import { useState } from 'react';
import { Code } from '../../store/codes';

export interface CodeModalStateReturns {
    code: string
    isOpen: boolean
    target: string
    tags: string
    setCode: React.Dispatch<React.SetStateAction<string>>
    setTarget: React.Dispatch<React.SetStateAction<string>>
    setTags: React.Dispatch<React.SetStateAction<string>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const prepareModalState = (): CodeModalStateReturns => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [code, setCode] = useState("")
    const [target, setTarget] = useState("")
    const [tags, setTags] = useState("")

    return { code, setCode, isOpen, setIsOpen, target, setTarget, tags, setTags }
}

export const openCodeModal = (code: Code, state: CodeModalStateReturns) => {
    // function to focus on our target input field
    const focus = () => (document.querySelector('#target') as HTMLInputElement).focus()

    // set the code
    state.setCode(code.code)

    // update the state for CardModal
    state.setTarget(code.links[0].url)
    state.setTags((code.tags || []).join(' '))

    // show the modal & set focus on target
    state.setIsOpen(true)
    focus()
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
