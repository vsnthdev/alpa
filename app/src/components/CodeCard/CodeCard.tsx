/*
 *  A single code block, which can be edited or modified.
 *  Created On 11 February 2022
 */

import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { Code } from '../../store/codes';
import { CodeModalStateReturns, openCodeModal } from "../CodeModal/functions";
import { del, copyShortURL } from './functions';
import Tippy from '@tippyjs/react';

interface CodeCardOptions {
    code: Code
    modalState: CodeModalStateReturns
}

export const CodeCard = ({code, modalState }: CodeCardOptions): ReactElement => {
    const [ showCopiedTooltip, setShowCopiedToolTip ] = useState(false)
    const { apiHost, apiToken } = useSelector((state: AppState) => state.auth)
    const dispatch = useDispatch()

    return <div className="bg-white border-2 border-slate-200 w-full p-8 rounded-lg flex flex-col">
        {/* the code of the item */}
        <div className="mb-1">
            <code className="font-bold text-2xl mb-1">{ code.code }</code>
        </div>
        
        {/* the link */}
        <div className="mb-4 max-w-full flex">
            <a className="text-sm truncate" href={code.links[0].url} target="_blank" rel="noopener">{code.links[0].url}</a>
        </div>
        
        {/* render tags if exist */}
        {
            code.tags && <div className="mb-4 text-xs flex flex-wrap">
                {code.tags.split(';').map(tag => <span key={tag} className="cursor-pointer text-white bg-blue-600 px-3 py-1 mt-2 mr-2 rounded-full">{tag}</span>)}
            </div>
        }

        {/* the card actions */}
        <div className="flex space-x-5 md:space-x-2">
            {/* copy short URL button */}
            {Boolean(navigator.clipboard) && <Tippy content="Copy short URL" delay={700} theme="light"><Tippy visible={showCopiedTooltip} onClickOutside={() => setShowCopiedToolTip(false)} content="✅ Copied short URL" theme="primary" animation="shift-away" inertia={true}><button className="outline-none transition-colors hover:text-blue-600" onClick={() => copyShortURL({ apiHost, code, setShowCopiedToolTip })}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 aspect-square" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button></Tippy></Tippy>}

            {/* edit button */}
            <Tippy content="Edit short code" theme="light" delay={700}><button className="outline-none transition-colors hover:text-blue-600" onClick={e => { openCodeModal(code, modalState) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 aspect-square" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button></Tippy>

            {/* delete button */}
            <Tippy content="Delete this short code" theme="light" delay={700}><button className="outline-none transition-colors hover:text-red-600" onClick={() => del({ apiHost, apiToken, dispatch, code: code.code })}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 aspect-square" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button></Tippy>
        </div>
    </div>
}
