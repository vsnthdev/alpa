/*
 *  The hero section of the Dashboard common for all pages
 *  within the dashboard.
 *  Created On 17 February 2022
 */

import axios from 'axios';
import { Dispatch, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { Code, patch, update } from '../../store/codes';
import { CodeModalStateReturns, openCodeModal, generateCodeString } from '../CodeModal/functions';
import progress from 'nprogress';
import { useDebouncedCallback } from 'use-debounce';

interface DashHeroOptions {
    loading: boolean
    quickText: string
    modalState: CodeModalStateReturns
    setQuickText: Dispatch<React.SetStateAction<string>>
}

export const DashHero = ({ loading, modalState, quickText, setQuickText }: DashHeroOptions): ReactElement => {
    const dispatch = useDispatch()
    const auth = useSelector((app: AppState) => app.auth)

    const onClick = () => {
        if (quickText.length == 0) {
            openCodeModal(null, modalState)
        } else {
            progress.start()

            const data = { code: generateCodeString(), links: [ { url: quickText } ], tags: '' } as Code

            axios({
                data,
                method: 'POST',
                url: `${auth.apiHost}/api/codes?force=true`,
                headers: {
                    Authorization: `Bearer ${auth.apiToken}`
                },
            }).then(() => {
                // dispatch a app store change
                dispatch(patch(data))

                // clear input text
                setQuickText("")

                // stop progressbar
                progress.done()
            })
        }
    }

    const searchAPI = useDebouncedCallback(async () => {
        if (Boolean(quickText) == false) return

        progress.start()
        axios({
            method: 'GET',
            url: `${auth.apiHost}/api/codes?search=${quickText}`,
            headers: {
                Authorization: `Bearer ${auth.apiToken}`
            },
        }).then(({ data }) => {
            dispatch(update(data.codes))
        }).finally(() => progress.done())
    }, 200)

    return <div className="bg-blue-600 text-white pt-20 pb-24 px-12">
        <div className="flex flex-col justify-center items-center">
            <input autoFocus={true} type="text" id="searchOrCreate" placeholder="Search or quickly create" value={quickText} onChange={e => { setQuickText(e.target.value); searchAPI() }} className={`appearance-none outline-none rounded-md w-full max-w-xl px-4 py-3 transition-all font-medium text-white bg-blue-800 placeholder-blue-500 hover:bg-blue-700 focus:bg-white focus:placeholder-slate-400 focus:text-slate-900 ${loading ? "opacity-0" : "opacity-100"}`} />
            <div className="mt-16">
                <button className={`relative outline-none text-slate-700 bg-white font-semibold w-32 h-10 rounded-md text-sm transition-all hover:bg-slate-200 ${loading ? "opacity-0" : "opacity-100"}`} onClick={onClick}>
                    <span className={`absolute transition-opacity inset-0 flex justify-center items-center ${quickText.length == 0 ? "opacity-100" : "opacity-0"}`}>Create now</span>
                    <span className={`absolute transition-opacity inset-0 flex justify-center items-center ${quickText.length == 0 ? "opacity-0" : "opacity-100"}`}>Quick create</span>
                </button>
            </div>
        </div>
    </div>
}
