/*
 *  The hero section of the Dashboard common for all pages
 *  within the dashboard.
 *  Created On 17 February 2022
 */

import axios from 'axios'
import progress from 'nprogress'
import { Dispatch, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../../store'
import { Code, patch } from '../../store/codes'
import {
    CodeModalStateReturns,
    generateCodeString,
    openCodeModal,
} from '../CodeModal/functions'

export const DashHero = ({
    loading,
    quickText,
    modalState,
    setQuickText,
}: {
    loading: boolean
    quickText: string
    modalState: CodeModalStateReturns
    setQuickText: Dispatch<React.SetStateAction<string>>
}): ReactElement => {
    const dispatch = useDispatch()
    const auth = useSelector((app: AppState) => app.auth)

    const onClick = () => {
        if (quickText.length == 0) {
            openCodeModal(null, modalState)
        } else {
            progress.start()

            const data = {
                code: generateCodeString(),
                links: [{ url: quickText }],
                tags: '',
            } as Code

            axios({
                data,
                method: 'POST',
                url: `${auth.apiHost}/api/codes?force=true`,
                headers: {
                    Authorization: `Bearer ${auth.apiToken}`,
                },
            }).then(() => {
                // dispatch a app store change
                dispatch(patch(data))

                // clear input text
                setQuickText('')

                // stop progressbar
                progress.done()
            })
        }
    }

    return (
        <div className="mb-16 mt-16 md:mt-24 px-12">
            <div className="flex flex-col justify-center items-center">
                <div>
                    <button
                        className={`w-32 h-10 relative font-bold outline-none border border-transparent text-sm rounded-md transition-colors text-white bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-hover ${
                            loading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onClick={onClick}
                    >
                        <span
                            className={`absolute transition-opacity bottom-[2px] left-0 right-0 top-0 flex justify-center items-center ${
                                quickText.length == 0
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                        >
                            Create now
                        </span>
                        <span
                            className={`absolute transition-opacity bottom-[2px] left-0 right-0 top-0 flex justify-center items-center ${
                                quickText.length == 0
                                    ? 'opacity-0'
                                    : 'opacity-100'
                            }`}
                        >
                            Quick create
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
