/*
 *  A single code block, which can be edited or modified.
 *  Created On 11 February 2022
 */

import Tippy from '@tippyjs/react'
import { Dispatch, ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../../store'
import { Code } from '../../store/codes'
import { searchAPI } from '../../util/searchAPI'
import { CodeModalStateReturns, openCodeModal } from '../CodeModal'
import { copyShortURL, del, getColorFromTag } from './index'

export const CodeCard = ({
    code,
    modalState,
    quickText,
    setQuickText,
}: {
    code: Code
    quickText: string
    modalState: CodeModalStateReturns
    setQuickText: Dispatch<React.SetStateAction<string>>
}): ReactElement => {
    const [showCopiedTooltip, setShowCopiedToolTip] = useState(false)
    const auth = useSelector((state: AppState) => state.auth)
    const dispatch = useDispatch()

    return (
        <div className="bg-white border-2 border-neutral-100 w-full p-8 flex flex-col lg:border-0">
            {/* the code of the item */}
            <div className="mb-2 lg:mb-1">
                <code className="font-extrabold text-2xl mb-1">
                    {code.code}
                </code>
            </div>

            {/* the link */}
            <div className="mb-4 max-w-xl flex">
                <a
                    className="text-sm truncate"
                    href={code.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {code.links[0].url}
                </a>
            </div>

            {/* tags & card actions */}
            <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row lg:mt-2">
                {/* render tags if exist */}
                {code.tags ? (
                    <div className="mt-2 mb-6 text-xs flex flex-wrap lg:mb-0 lg:mt-0">
                        {code.tags.split(';').map(tag => (
                            <span
                                key={tag}
                                onClick={() => {
                                    setQuickText(tag)
                                    searchAPI({
                                        auth,
                                        dispatch,
                                        quickText,
                                    })
                                }}
                                className="cursor-pointer text-black px-3 py-1 mr-2 mb-2 rounded-full lg:mb-0"
                                style={{
                                    backgroundColor: getColorFromTag(tag),
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="hidden text-sm text-neutral-400 lg:inline-flex">
                        Not tagged
                    </p>
                )}

                {/* the card actions */}
                <div className="flex space-x-5 md:space-x-2">
                    {/* copy short URL button */}
                    {Boolean(navigator.clipboard) && (
                        <Tippy
                            content="Copy short URL"
                            delay={700}
                            theme="light"
                        >
                            <Tippy
                                visible={showCopiedTooltip}
                                onClickOutside={() =>
                                    setShowCopiedToolTip(false)
                                }
                                content="✅ Copied short URL"
                                theme="primary"
                                animation="shift-away"
                                inertia={true}
                            >
                                <button
                                    className="outline-none transition-colors hover:text-primary"
                                    onClick={() =>
                                        copyShortURL({
                                            apiHost: auth.apiHost,
                                            code,
                                            setShowCopiedToolTip,
                                        })
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 aspect-square"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </button>
                            </Tippy>
                        </Tippy>
                    )}

                    {/* edit button */}
                    <Tippy content="Edit short code" theme="light" delay={700}>
                        <button
                            className="outline-none transition-colors hover:text-primary"
                            onClick={() => {
                                openCodeModal(code, modalState)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 aspect-square"
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
                        </button>
                    </Tippy>

                    {/* delete button */}
                    <Tippy
                        content="Delete this short code"
                        theme="light"
                        delay={700}
                    >
                        <button
                            className="outline-none transition-colors hover:text-primary"
                            onClick={() =>
                                del({
                                    apiHost: auth.apiHost,
                                    apiToken: auth.apiToken,
                                    dispatch,
                                    code: code.code,
                                })
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 aspect-square"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </Tippy>
                </div>
            </div>
        </div>
    )
}
