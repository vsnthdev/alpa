/*
 *  A modal for editing a short code.
 *  Created On 12 February 2022
 */

import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { Code } from "../../store/codes";
import { CodeModalStateReturns, cancelAction, applyAction } from './functions';

interface CodeModalOptions {
    modalState: CodeModalStateReturns
}

export const CodeModal = ({ modalState }: CodeModalOptions): ReactElement => {
    const { code, isOpen, setCode } = modalState
    const dispatch = useDispatch()
    const auth = useSelector((state: AppState) => state.auth)

    const setTarget = (targetURL: string) => setCode({ ...code, ...{ links: [{ url: targetURL }] } } as Code)
    const setTags = (tagsString: string) => setCode({ ...code, ...{ tags: tagsString } } as Code)

    return <div className={`fixed z-10 inset-0 overflow-y-auto transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen || 'pointer-events-none'}`} onKeyDown={e => e.code == 'Escape' && cancelAction(modalState) }>
        <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity" onClick={() => cancelAction(modalState)} ></div>

            <div className="w-full inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg">
                <div className="bg-slate-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div
                            className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                                className="text-2xl font-semibold text-slate-900"
                                id="modal-title"
                            >
                                Edit {code.code}
                            </h3>
                            <div className="mt-6">
                                <div className="w-full flex flex-col space-y-2">
                                    <label className="mr-auto">Target</label>
                                    <input className="w-full px-3 py-2 border-2 outline-none transition-colors border-slate-200 focus:border-blue-500 rounded-md" type="text" id="target" placeholder="URL you want to redirect to" value={code.links ? code.links[0].url : ''} onChange={e => setTarget(e.target.value)} required />
                                </div>
                                <div className="mt-4 w-full flex flex-col space-y-2">
                                    <label className="mr-auto">Tags</label>
                                    <textarea id="tags" rows={3} className="appearance-none w-full px-3 py-2 border-2 outline-none transition-colors border-slate-200 focus:border-blue-500 rounded-md resize-none" placeholder="Space separated words used to easily identify codes." value={code.tags ? code.tags : ''} onChange={e => setTags(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 transition-colors bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => applyAction(modalState, dispatch, auth)}>
                        Apply
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 transition-colors bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => cancelAction(modalState)}>
                        Cancel
                    </button>
            </div>
            </div>
        </div>
    </div>
}
