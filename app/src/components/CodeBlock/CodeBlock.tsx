/*
 *  A single code block, which can be edited or modified.
 *  Created On 11 February 2022
 */

import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { Code } from '../../store/codes';
import { del } from './functions';

export const CodeBlock = ({code}: { code: Code }): ReactElement | null => {
    const { apiHost, apiToken } = useSelector((state: AppState) => state.auth)

    const [ render, setRender ] = useState(true)

    return render
    ? <div className="bg-white border-2 border-slate-200 w-full p-8 rounded-lg flex flex-col">
        {/* the code of the item */}
        <div className="mb-1">
            <code className="font-bold text-2xl mb-1">{ code.code }</code>
        </div>
        
        {/* the link */}
        <div className="mb-2">
            <a className="text-sm" href={code.links[0].url} target="_blank" rel="noopener">{code.links[0].url}</a>
        </div>
        
        {/* render tags if exist */}
        { code.tags
        ? <div className="mb-6 flex space-x-2 text-xs">
            {code.tags.map(tag => <span key={tag} className="cursor-pointer text-white bg-blue-600 px-3 py-1 rounded-full">{tag}</span>)}
        </div>
        : <></> }

        {/* the card actions */}
        <div className="flex space-x-2">
            {/* edit button */}
            <button className="transition-colors hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 aspect-square" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>

            {/* delete button */}
            <button className="transition-colors hover:text-red-600" onClick={() => del({ apiHost, apiToken, code: code.code, setRender })}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 aspect-square" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>

    : null
}
