/*
 *  The hero section of the Dashboard common for all pages
 *  within the dashboard.
 *  Created On 17 February 2022
 */

import { ReactElement, useState } from 'react';

export const DashHero = ({ loading }: { loading: boolean }): ReactElement => {
    const [ quickText, setQuickText ] = useState("")

    return <div className="bg-blue-600 text-white pt-20 pb-24 px-12">
        <div className="flex flex-col justify-center items-center">
            <input autoFocus={true} type="text" id="searchOrCreate" placeholder="Search or quickly create" value={quickText} onChange={e => setQuickText(e.target.value)} className={`appearance-none outline-none rounded-md w-full max-w-xl px-4 py-3 transition-all font-medium text-white bg-blue-800 placeholder-blue-500 hover:bg-blue-700 focus:bg-white focus:text-slate-900 ${loading ? "opacity-0" : "opacity-100"}`} />
            <div className="mt-16">
                <button className={`relative outline-none text-slate-700 bg-white font-semibold w-32 h-10 rounded-md text-sm transition-all hover:bg-slate-200 ${loading ? "opacity-0" : "opacity-100"}`}>
                    <span className={`absolute transition-opacity inset-0 flex justify-center items-center ${quickText.length == 0 ? "opacity-100" : "opacity-0"}`}>Create now</span>
                    <span className={`absolute transition-opacity inset-0 flex justify-center items-center ${quickText.length == 0 ? "opacity-0" : "opacity-100"}`}>Quick create</span>
                </button>
            </div>
        </div>
    </div>
}
