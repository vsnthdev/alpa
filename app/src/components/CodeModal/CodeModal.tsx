/*
 *  A modal for editing a short code.
 *  Created On 12 February 2022
 */

import { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../../store'
import { Code } from '../../store/codes'
import {
    applyAction,
    cancelAction,
    CodeModalStateReturns,
    generateCodeString,
} from './functions'

interface CodeModalOptions {
    modalState: CodeModalStateReturns
}

export const CodeModal = ({ modalState }: CodeModalOptions): ReactElement => {
    const { code, isOpen, setCode, isCreatingNew } = modalState
    const dispatch = useDispatch()
    const auth = useSelector((state: AppState) => state.auth)

    const setCodeValue = (codeString: string) =>
        setCode({ ...code, ...{ code: codeString } } as Code)
    const setTarget = (targetURL: string) =>
        setCode({ ...code, ...{ links: [{ url: targetURL }] } } as Code)
    const setTags = (tagsString: string) =>
        setCode({ ...code, ...{ tags: tagsString } } as Code)

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0'
            } ${isOpen || 'pointer-events-none'}`}
            onKeyDown={e => e.code == 'Escape' && cancelAction(modalState)}
        >
            <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div
                    className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity"
                    onClick={() => cancelAction(modalState)}
                ></div>

                <div className="w-full inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg">
                    <div className="bg-neutral-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/[0.1] sm:mx-0 sm:h-10 sm:w-10">
                                {isCreatingNew ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-2xl font-bold text-neutral-900"
                                    id="modal-title"
                                >
                                    {isCreatingNew
                                        ? `Creating ${code.code}`
                                        : `Edit ${code.code}`}
                                </h3>
                                <div className="mt-6 mb-4">
                                    {isCreatingNew && (
                                        <div className="w-full flex flex-col space-y-2">
                                            <label className="mr-auto">
                                                Code
                                            </label>
                                            <div className="flex px-3 py-2 border-2 transition-colors rounded-md bg-white border-neutral-200 focus-within:border-primary">
                                                <input
                                                    className="w-full outline-none transition-colors"
                                                    type="text"
                                                    id="code"
                                                    placeholder="The short code"
                                                    value={code.code}
                                                    onChange={e =>
                                                        setCodeValue(
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <button
                                                    className="pl-2 transition-colors outline-none text-neutral-400 hover:text-neutral-600 focus:text-neutral-600 active:text-black"
                                                    onClick={() =>
                                                        setCodeValue(
                                                            generateCodeString(),
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`w-full flex flex-col space-y-2 ${
                                            isCreatingNew && 'mt-4'
                                        }`}
                                    >
                                        <label className="mr-auto">
                                            Target
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 border-2 outline-none transition-colors border-neutral-200 focus:border-primary rounded-md"
                                            type="text"
                                            id="target"
                                            placeholder="URL you want to redirect to"
                                            value={
                                                code.links
                                                    ? code.links[0].url
                                                    : ''
                                            }
                                            onChange={e =>
                                                setTarget(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mt-4 w-full flex flex-col space-y-2">
                                        <label className="mr-auto">Tags</label>
                                        <textarea
                                            id="tags"
                                            rows={3}
                                            className="appearance-none w-full px-3 py-2 border-2 outline-none transition-colors border-neutral-200 focus:border-primary rounded-md resize-none"
                                            placeholder="Semicolon separated words used to easily identify codes."
                                            value={code.tags ? code.tags : ''}
                                            onChange={e =>
                                                setTags(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent px-4 pt-2 pb-[9px] transition-colors bg-primary font-bold text-neutral-100 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() =>
                                applyAction(modalState, dispatch, auth)
                            }
                        >
                            {isCreatingNew ? 'Create' : 'Apply'}
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-neutral-300  px-4 pt-2 pb-[9px] transition-colors bg-white font-bold text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => cancelAction(modalState)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
