/*
 *  Site-wide header component contains mainly the
 *  logo & user profile menu.
 *  Created On 08 February 2022
 */

import { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logout from '../../pages/Dash'
import { AppState } from '../../store/index'

export const Header = (): ReactElement => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const auth = useSelector((state: AppState) => state.auth)

    return (
        <header className="py-8">
            <div className="container mx-auto flex justify-between items-center px-10">
                {/* brand */}
                <a href="/">
                    <svg
                        className="h-12 py-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 912.4 276.961"
                    >
                        <g id="logo" transform="translate(-384 -831.6)">
                            <path
                                id="logo-2"
                                data-name="logo"
                                d="M-445.394-180.982c0-12.08,10.607-18.268,33.883-18.268h30.937v5.009c0,23.571-19.741,29.464-36.83,29.464C-433.02-164.777-445.394-170.375-445.394-180.982Zm-40.366,1.473c0,32.116,21.509,47.142,59.517,47.142,22.393,0,37.125-7.071,45.669-18.857v15.911H-340.8v-97.231c0-36.535-27.4-58.928-69.535-58.928-30.053,0-46.553,9.134-63.053,23.571l21.509,24.75c11.491-8.839,26.812-12.964,42.723-12.964,19.446,0,28.58,9.723,28.58,23.571v5.6H-417.4C-448.93-226.946-485.76-219.286-485.76-179.509ZM-303.968-350.4v215.087h39.776V-350.4Zm117.856,138.48c0-25.339,16.794-42.723,41.249-42.723s40.071,17.384,40.071,42.723S-120.407-169.2-144.862-169.2-186.112-186.581-186.112-211.92Zm-39.776,138.48h39.776V-158.59c8.839,16.205,24.16,26.223,50.089,26.223,42.428,0,70.713-32.7,70.713-79.553s-28.285-79.553-70.713-79.553c-25.928,0-41.249,10.018-50.089,26.223v-23.276h-39.776ZM-3.436-180.982c0-12.08,10.607-18.268,33.884-18.268H61.385v5.009c0,23.571-19.741,29.464-36.83,29.464C8.939-164.777-3.436-170.375-3.436-180.982ZM-43.8-179.509c0,32.116,21.509,47.142,59.517,47.142,22.393,0,37.125-7.071,45.669-18.857v15.911h39.776v-97.231c0-36.535-27.4-58.928-69.535-58.928-30.053,0-46.553,9.134-63.053,23.571l21.509,24.75c11.491-8.839,26.812-12.964,42.723-12.964,19.446,0,28.58,9.723,28.58,23.571v5.6H24.555C-6.971-226.946-43.8-219.286-43.8-179.509Z"
                                transform="translate(1195.238 1182)"
                                fill="#ef233c"
                            />
                            <g id="icon" transform="translate(384 831.846)">
                                <rect
                                    id="short"
                                    width="86"
                                    height="149"
                                    rx="43"
                                    transform="translate(117 66.035)"
                                    fill="#1c1917"
                                />
                                <rect
                                    id="tall"
                                    width="86"
                                    height="215"
                                    rx="43"
                                    transform="translate(0 0.035)"
                                    fill="#1c1917"
                                />
                            </g>
                        </g>
                    </svg>
                </a>

                {/* logout button */}
                {auth.isLoggedIn ? (
                    <button
                        className="font-bold pt-2 pb-[9px] px-4 border border-transparent text-sm rounded-md transition-colors text-white bg-secondary hover:bg-secondary-hover outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-800"
                        onClick={() => logout({ auth, navigate, dispatch })}
                    >
                        Logout
                    </button>
                ) : (
                    ''
                )}
            </div>
        </header>
    )
}
