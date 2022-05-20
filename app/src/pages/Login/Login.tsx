/*
 *  The login page which redirects to the dashboard
 *  if the user is already logged in with a valid token.
 *  Created On 08 February 2022
 */

import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import login, { openDashboard } from './index'

export const Login = (): ReactElement => {
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [username, updateUsername] = useState(
        localStorage.getItem('username') || '',
    )
    const [apiHost, updateApiHost] = useState(
        localStorage.getItem('apiHost') || '',
    )

    const setUsername = (username: string) => {
        // set username in state
        updateUsername(username)

        // set username in localStorage
        localStorage.setItem('username', username)
    }

    const setApiHost = (host: string) => {
        // set API host in state
        updateApiHost(host)

        // set API host in localStorage
        localStorage.setItem('apiHost', host)
    }

    const submit = (e: any) => {
        // prevent page refresh
        e.preventDefault()

        // trigger the login function
        login({
            apiHost,
            navigate,
            credentials: {
                username,
                password,
            },
        })

        return false
    }

    // check if an existing token exists
    useEffect(() => {
        if (localStorage.getItem('apiToken')) openDashboard(navigate)
    }, [])

    return (
        <main className="h-full flex justify-center items-center">
            <div className="-mt-20 w-full flex justify-center items-center">
                {/* login card */}
                <div className="bg-white p-8 flex flex-col rounded-xl shadow-2xl shadow-neutral-200 max-w-lg md:p-12">
                    {/* card information */}
                    <h1 className="text-4xl font-extrabold mb-4 md:text-5xl">
                        Log in
                    </h1>
                    <p className="mb-4 text-base">
                        Welcome to{' '}
                        <a
                            className="text-primary"
                            href="https://github.com/vsnthdev/alpa"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            alpa
                        </a>
                        , please input the configured login credentials to
                        manage your short links.
                    </p>

                    {/* input fields */}
                    <form className="space-y-4" onSubmit={submit}>
                        {/* host */}
                        <div className="flex flex-col items-center space-y-2">
                            <label className="mr-auto text-neutral-600">
                                Short domain
                            </label>
                            <input
                                className="w-full px-3 py-2 border-2 outline-none border-neutral-200 focus:border-neutral-500 rounded-xl transition-colors"
                                type="text"
                                id="host"
                                placeholder="http://localhost:1727"
                                value={apiHost as string}
                                onChange={e => setApiHost(e.target.value)}
                                autoFocus={!apiHost}
                                required
                            />
                        </div>

                        {/* username */}
                        <div className="flex flex-col items-center space-y-2">
                            <label className="mr-auto text-neutral-600">
                                Username
                            </label>
                            <input
                                className="w-full px-3 py-2 border-2 outline-none border-neutral-200 focus:border-neutral-500 rounded-xl transition-colors"
                                type="text"
                                id="username"
                                placeholder="alpa"
                                autoFocus={Boolean(apiHost)}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* password */}
                        <div className="flex flex-col items-center space-y-2">
                            <label className="mr-auto text-neutral-600">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border-2 outline-none border-neutral-200 focus:border-neutral-500 rounded-xl transition-colors"
                                type="password"
                                id="password"
                                placeholder="B^a8K7DD"
                                autoFocus={Boolean(username)}
                                value={password as string}
                                onChange={e => setPassword(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key == 'Enter')
                                        document
                                            .querySelector('form')
                                            ?.requestSubmit()
                                }}
                                required
                            />
                        </div>

                        {/* login button */}
                        <div className="pt-3 flex justify-center">
                            <a>
                                <button
                                    className="bg-primary hover:bg-primary-hover text-white font-semibold w-full px-4 pt-2 pb-[9px] rounded-lg transition focus:outline-none active:transform-gpu active:scale-95 focus:scale-95 sm:text-sm"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
