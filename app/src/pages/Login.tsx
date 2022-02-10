/*
 *  The login page which redirects to the dashboard 
 *  if the user is already logged in with a valid token.
 *  Created On 08 February 2022
 */

import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const Login = (): ReactElement => <main className="h-full flex justify-center items-center px-10">
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
                    <input className="w-full font-semibold px-3 py-2 border-2 outline-none border-slate-200 focus:border-blue-500 rounded-md" type="text" id="host" placeholder="http://localhost:1727" autoFocus />
                </div>

                {/* username */}
                <div className="flex flex-col items-center space-y-2">
                    <label className="mr-auto">Username</label>
                    <input className="w-full font-semibold px-3 py-2 border-2 outline-none border-slate-200 focus:border-blue-500 rounded-md" type="text" id="username" placeholder="alpa" />
                </div>

                {/* password */}
                <div className="flex flex-col items-center space-y-2">
                    <label className="mr-auto">Password</label>
                    <input className="w-full font-semibold px-3 py-2 border-2 outline-none border-slate-200 focus:border-blue-500 rounded-md" type="password" id="password" placeholder="B^a8K7DD" />
                </div>

                {/* login button */}
                <div className="pt-3 flex justify-center">
                    <Link to="/dash">
                        <button className="font-semibold py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</main>
