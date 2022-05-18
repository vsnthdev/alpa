/*
 *  Site-wide header component contains mainly the
 *  logo & user profile menu.
 *  Created On 08 February 2022
 */

import { Dispatch, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { AppState } from '../../store/index'
import logout from '../../util/logout'
import { searchAPI } from '../../util/searchAPI'

export const Topbar = ({
    loading,
    quickText,
    setQuickText,
    setLoading,
}: {
    loading: boolean
    quickText: string
    setQuickText: Dispatch<React.SetStateAction<string>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const auth = useSelector((state: AppState) => state.auth)

    const triggerSearchAPI = useDebouncedCallback(async () => {
        if (Boolean(quickText) == false) return

        // call search api api
        searchAPI({
            auth,
            quickText,
            dispatch,
        })
    }, 200)

    return (
        <div className="py-8">
            <div className="container mx-auto flex justify-between items-center space-x-4">
                {/* search bar */}
                <div className="w-full">
                    {auth.isLoggedIn && loading == false && (
                        <input
                            type="text"
                            id="txtSearch"
                            value={quickText}
                            placeholder="Search for codes, tags and links"
                            className="w-full max-w-md px-3.5 py-2 border-2 outline-none border-neutral-200 focus:border-neutral-400 focus:shadow-lg focus:shadow-neutral-200 rounded-xl transition-all md:text-sm"
                            onChange={e => {
                                setQuickText(e.target.value)
                                triggerSearchAPI()
                            }}
                        />
                    )}
                </div>

                {/* logout button */}
                {auth.isLoggedIn ? (
                    <a
                        onClick={() =>
                            logout({ auth, navigate, dispatch, setLoading })
                        }
                    >
                        <button className="text-black font-bold py-2 rounded-md transition items-center space-x-1 focus:outline-none active:transform-gpu active:scale-95 md:flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 aspect-square"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
