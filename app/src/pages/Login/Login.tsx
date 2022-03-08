/*
 *  The login page which redirects to the dashboard 
 *  if the user is already logged in with a valid token.
 *  Created On 08 February 2022
 */

import { ReactElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import login, { openDashboard } from './index';

export const Login = (): ReactElement => {
    const navigate = useNavigate()

    const auth = useSelector((state: AppState) => state.auth)

    const [ password, setPassword ] = useState("")
    const [ username, updateUsername ] = useState(localStorage.getItem('username') || "")
    const [ apiHost, updateApiHost ] = useState(localStorage.getItem('apiHost') || "")

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
            }
        })

        return false
    }

    // check if an existing token exists
    useEffect(() => {
        if (Boolean(localStorage.getItem('apiToken'))) openDashboard(navigate)
    }, [])

    return <main className="h-full flex justify-center items-center px-10">
        <div className="-mt-20 w-full flex justify-center items-center">
            {/* login card */}
            <div className="bg-white p-8 flex flex-col rounded-xl border-2 border-slate-200 max-w-lg md:p-12">
                {/* card information */}
                <h1 className="text-4xl font-bold mb-4 md:text-5xl">Log in</h1>
                <p className="mb-8 text-base">Welcome to <a className="text-primary" href="https://github.com/vsnthdev/alpa" target="_blank" rel="noopener">alpa</a>, please input the configured login credentials to manage your short links.</p>
                
                {/* input fields */}
                <form className="space-y-4" onSubmit={submit}>
                    {/* host */}
                    <div className="flex flex-col items-center space-y-2">
                        <label className="mr-auto text-slate-600">API Host</label>
                        <input className="w-full px-3 py-2 border-2 outline-none border-slate-200 focus:border-primary rounded-md transition-colors" type="text" id="host" placeholder="http://localhost:1727" value={apiHost as string} onChange={e => setApiHost(e.target.value)} autoFocus={!Boolean(apiHost)} required />
                    </div>

                    {/* username */}
                    <div className="flex flex-col items-center space-y-2">
                        <label className="mr-auto text-slate-600">Username</label>
                        <input className="w-full px-3 py-2 border-2 outline-none border-slate-200 focus:border-primary rounded-md transition-colors" type="text" id="username" placeholder="alpa" autoFocus={Boolean(apiHost)} value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>

                    {/* password */}
                    <div className="flex flex-col items-center space-y-2">
                        <label className="mr-auto text-slate-600">Password</label>
                        <input className="w-full px-3 py-2 border-2 outline-none border-slate-200 focus:border-primary rounded-md transition-colors" type="password" id="password" placeholder="B^a8K7DD" autoFocus={Boolean(username)} value={password as string} onChange={e => setPassword(e.target.value)} onKeyUp={e => { if (e.key == 'Enter') document.querySelector('form')?.requestSubmit() }} required />
                    </div>

                    {/* login button */}
                    <div className="pt-3 flex justify-center">
                        <button className="font-semibold py-2 px-4 border border-transparent text-sm rounded-md transition-colors text-white bg-primary hover:bg-primary outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
}
