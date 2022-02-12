/*
 *  The dashboard where you can create, edit and delete short links.
 *  Created On 11 February 2022
 */

import { ReactElement, useEffect } from "react";
import progress from 'nprogress';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';
import { useSelector } from "react-redux";
import { AppState } from "../../store";

export const DashContent = (): ReactElement => {
    // pull codes from the store
    const codes = useSelector((state: AppState) => state.codes)

    // stop the progress bar
    useEffect(() => {
        progress.done()
    }, [])

    return <div className="py-24 container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-16 md:text-4xl">Recently created</h1>
        <div className="flex flex-col w-full max-w-3xl px-8 items-center space-y-8">
            { codes.map(code => <CodeBlock key={code.code} code={code}></CodeBlock> ) }
        </div>
    </div>
}
