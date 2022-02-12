/*
 *  A modal for editing a short code.
 *  Created On 12 February 2022
 */

import { ReactElement } from "react";

export const CodeModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: any}): ReactElement => {
    return <div className={`fixed z-10 inset-0 overflow-y-auto transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen || 'pointer-events-none'}`} onKeyDown={e => e.code == 'Escape' && setIsOpen(false) }>
        <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)} ></div>

            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-slate-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div
                            className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                                className="text-lg leading-6 font-medium text-slate-900"
                                id="modal-title"
                            >
                                Edit {`{code}`}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-slate-500">
                                    Are you sure you want to deactivate your account? All of
                                    your data will be permanently removed. This action
                                    cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsOpen(false)}>
                        Apply
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
            </div>
            </div>
        </div>
    </div>
}
