/*
 *  The login page which redirects to the dashboard 
 *  if the user is already logged in with a valid token.
 *  Created On 08 February 2022
 */

import { ReactElement, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = (): ReactElement => {
    const navigate = useNavigate()
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

    const loginUser = async () => {
        try {
            const { status, data } = await axios({
                method: 'POST',
                url: `${apiHost}/api/auth/login`,
                data: {
                    username,
                    password,
                }
            })
    
            if (status == 200) {
                localStorage.setItem('apiToken', data.token)
                navigate('/dash')
            }
        } catch {
            console.log('failed login attempt')
        }
    }

    return <main className="h-full flex justify-center items-center px-10">
        <div className="-mt-20 w-full flex justify-center items-center">
            {/* login card */}
            <div className="bg-white p-8 flex flex-col rounded-xl border-2 border-slate-200 max-w-md">
                {/* card information */}
                <h1 className="text-4xl font-bold mb-4">Log in</h1>
                <p className="mb-8">Welcome to <a className="text-blue-500" href="https://github.com/vsnthdev/alpa" target="_blank" rel="noopener">alpa</a>, please input the configured login credentials to manage your short links.</p>
                
                {/* input fields */}
                <div className="space-y-4">
                    {/* host */}
                    <div className="flex flex-col items-center space-y-2">
                        <label className="mr-auto">API Host</label>
                        <input className="w-full font-semibold px-3 py-2 border-2 outline-none border-slate-200 focus:border-blue-500 rounded-md" type="text" id="host" placeholder="http://localhost:1727" value={apiHost as string} onChange={e => setApiHost(e.target.value)} autoFocus={!Boolean(apiHost)} />
                    </div>

                    {/* username */}
                    <div className="flex flex-col items-center space-y-2">
                        <label className="mr-auto">Username</label>
                        <input className="w-full font-semibold px-3 py-2 border-2 outline-none border-slate-200 focus:border-blue-500 rounded-md" type="text" id="username" placeholder="alpa" autoFocus={Boolean(apiHost)} value={username as string} onChange={e => setUsername(e.target.value)} />
                    </div>

                    {/* password */}
                    <div className="flex flex-col items-center space-y-2">
                        <label className="mr-auto">Password</label>
                        <input className="w-full font-semibold px-3 py-2 border-2 outline-none border-slate-200 focus:border-blue-500 rounded-md" type="password" id="password" placeholder="B^a8K7DD" autoFocus={Boolean(username)} value={password as string} onChange={e => setPassword(e.target.value)} onKeyUp={e => { if (e.key == 'Enter') loginUser() }} />
                    </div>

                    {/* login button */}
                    <div className="pt-3 flex justify-center">
                        <button className="font-semibold py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={loginUser}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
}
