/*
 *  Site-wide sidebar for navigating the dash app.
 *  Created On 14 May 2022
 */

import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { AppState } from '../../store'
import { CodeModalStateReturns, openCodeModal } from '../CodeModal'

export const Sidebar = ({
    modalState,
}: {
    modalState: CodeModalStateReturns
}): ReactElement => {
    const auth = useSelector((state: AppState) => state.auth)

    return (
        <header className="fixed w-14 z-10 h-screen bg-primary text-white rounded-tr-[30px] rounded-br-[30px] flex flex-col overflow-hidden shadow-primary/50 md:shadow-2xl md:w-16">
            <div className="h-full my-6 flex flex-col items-center justify-between mr-1">
                {/* top content */}
                <div className="flex flex-col items-center">
                    {/* the logo */}
                    <a
                        href="/"
                        className="transition-opacity opacity-60 hover:opacity-100"
                    >
                        <svg
                            className="h-5 aspect-square md:h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 462 490"
                        >
                            <g transform="translate(0 -0.035)">
                                <rect
                                    id="short"
                                    width="195"
                                    height="340"
                                    rx="97.5"
                                    transform="translate(267 150.035)"
                                    fill="currentColor"
                                ></rect>
                                <rect
                                    id="tall"
                                    width="196"
                                    height="490"
                                    rx="98"
                                    transform="translate(0 0.035)"
                                    fill="currentColor"
                                ></rect>
                            </g>
                        </svg>
                    </a>

                    {/* navigation items */}
                    {auth.isLoggedIn && (
                        <nav className="flex flex-col items-center mt-8 mb-4 space-y-1">
                            <NavLink
                                to="/"
                                className={isActive =>
                                    `transition-colors p-1.5 rounded-xl md:p-2 ${
                                        isActive
                                            ? 'bg-primary-hover'
                                            : 'hover:bg-white/20'
                                    }`
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 aspect-square"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </NavLink>
                            {/* <a
                            href="#"
                            className="transition-colors p-1.5 rounded-xl hover:bg-white/20 md:p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="aspect-square h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                            </svg>
                        </a> */}
                            <div className="px-1 pt-3 w-full">
                                <div className="bg-white/30 rounded-full h-0.5 w-full"></div>
                            </div>
                        </nav>
                    )}

                    {/* add new button */}
                    {auth.isLoggedIn && (
                        <button
                            id="btnNew"
                            onClick={() => openCodeModal(null, modalState)}
                            className="outline-none transition-colors p-1.5 rounded-xl text-primary-hover bg-white hover:bg-neutral-100 md:p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 aspect-square"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* bottom content */}
                <div className="flex flex-col items-center">
                    {/* social media links */}
                    <div className="flex flex-col items-center space-y-4">
                        <a
                            href="https://twitter.com/alpa_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity opacity-60 hover:opacity-100"
                        >
                            <svg
                                className="w-[17px] aspect-square"
                                version="1.1"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <path
                                    fill="currentColor"
                                    d="M492,109.5c-17.4,7.7-36,12.9-55.6,15.3c20-12,35.4-31,42.6-53.6c-18.7,11.1-39.4,19.2-61.5,23.5  C399.8,75.8,374.6,64,346.8,64c-53.5,0-96.8,43.4-96.8,96.9c0,7.6,0.8,15,2.5,22.1C172,179,100.6,140.4,52.9,81.7  c-8.3,14.3-13.1,31-13.1,48.7c0,33.6,17.1,63.3,43.1,80.7C67,210.7,52,206.3,39,199c0,0.4,0,0.8,0,1.2c0,47,33.4,86.1,77.7,95  c-8.1,2.2-16.7,3.4-25.5,3.4c-6.2,0-12.3-0.6-18.2-1.8c12.3,38.5,48.1,66.5,90.5,67.3c-33.1,26-74.9,41.5-120.3,41.5  c-7.8,0-15.5-0.5-23.1-1.4C62.9,432,113.8,448,168.4,448C346.6,448,444,300.3,444,172.2c0-4.2-0.1-8.4-0.3-12.5  C462.6,146,479,128.9,492,109.5z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://vas.cx/alpa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity opacity-60 hover:opacity-100"
                        >
                            <svg
                                className="w-[17px] aspect-square"
                                version="1.1"
                                viewBox="0 0 212.4575 186.23"
                                xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g>
                                    <path
                                        d="M151.7899,86.2343c-7.078,0.1229-14.154,0.5605-21.2324,0.7069c-12.3184,0.248-24.6404,0.5664-36.9608,0.512   c-11.1756-0.0472-22.3576-0.9728-33.5176-0.7052c-7.3164,0.1776-14.3732,2.2948-20.1308,7.584   c-9.9472,9.1368-12.5216,21-11.3144,33.8068c1.92,20.3572,9.2716,31.4492,29.1152,37.0644   c15.7928,4.4704,31.9628,5.2088,48.1992,4.9744c5.254,0,10.5096,0.1367,15.7576-0.0292   c12.7228-0.4064,25.264-2.2072,37.3576-6.3596c10.8456-3.7225,18.7988-10.6912,22.5724-22.166   c2.6736-8.1288,3.7148-16.3885,2.5544-24.8532C182.4131,103.8103,170.9151,85.91,151.7899,86.2343z M70.2139,146.2303   c-8.836,0-16-8.9551-16-20c0-11.0447,7.164-20,16-20s16,8.9553,16,20C86.2139,137.2752,79.0499,146.2303,70.2139,146.2303z    M146.2139,146.2303c-8.836,0-16-8.9551-16-20c0-11.0447,7.164-20,16-20s16,8.9553,16,20   C162.2139,137.2752,155.0499,146.2303,146.2139,146.2303z"
                                        fill="none"
                                    />
                                    <path
                                        d="M200.2451,59.1876c-2.5076-3.4493-4.3632-6.3888-3.8748-11.4396   c0.6796-7.0664-0.3536-14.3964-1.3204-21.5177C193.8311,17.246,191.5263,8.49,187.8723,0   c-9.0332,1.9356-17.9808,3.49-25.9632,8.0976c-8.4648,4.8908-16.6952,10.2148-25.08,15.25   c-0.9532,0.5704-2.3124,0.8848-3.3848,0.7032c-17.9668-3.1368-35.92-3.0196-53.8984-0.086   c-1.3632,0.2244-3.0724-0.2345-4.2948-0.9608c-4.4436-2.6604-8.6564-5.7344-13.1232-8.3516   c-11.656-6.844-23.66-12.8224-37.494-14.5901c-0.3928,0.8597-0.7188,1.4785-0.9612,2.1253   c-4.164,11.2204-6.6424,22.8436-7.4276,34.82c-0.2872,4.3516-0.6092,8.8048,0,13.0724c0.3456,2.4296-0.004,3.8788-1.3924,5.6132   C10.0011,61.742,6.2159,68.41,3.7511,75.912c-4.6972,14.2948-4.4004,28.8612-2.2756,43.4748   c1.7268,11.9744,4.7344,23.5368,11.3244,33.8728c13.1856,20.6816,32.8924,29.7736,55.5724,31.7052   c19.3084,1.6464,38.8004,1.1992,58.2128,1.2364c13.8552,0.0251,27.5704-1.4924,40.7148-6.6389   c20.3748-7.9727,33.8592-22.6035,40.2752-44.1659c3.7344-12.5448,5.2324-25.3964,4.8144-38.4981   C211.9483,83.088,208.3391,70.332,200.2451,59.1876z M181.6359,141.6228c-3.7736,11.4748-11.7268,18.4435-22.5724,22.166   c-12.0936,4.1524-24.6348,5.9532-37.3576,6.3596c-5.248,0.1659-10.5036,0.0292-15.7576,0.0292   c-16.2364,0.2344-32.4064-0.504-48.1992-4.9744c-19.8436-5.6152-27.1952-16.7072-29.1152-37.0644   c-1.2072-12.8068,1.3672-24.67,11.3144-33.8068c5.7576-5.2892,12.8144-7.4064,20.1308-7.584   c11.16-0.2676,22.342,0.658,33.5176,0.7052c12.3204,0.0544,24.6424-0.264,36.9608-0.512   c7.0784-0.1464,14.1544-0.584,21.2324-0.7069c19.1252-0.3243,30.6232,17.576,32.4004,30.5353   C185.3507,125.2343,184.3095,133.494,181.6359,141.6228z"
                                        fill="currentColor"
                                    />
                                    <ellipse
                                        cx="70.2139"
                                        cy="126.2303"
                                        fill="currentColor"
                                        rx="16"
                                        ry="20"
                                    />
                                    <ellipse
                                        cx="146.2139"
                                        cy="126.2303"
                                        fill="currentColor"
                                        rx="16"
                                        ry="20"
                                    />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}
