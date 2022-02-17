/*
 *  The dashboard where you can create, edit and delete short links.
 *  Created On 11 February 2022
 */

import { ReactElement, useEffect } from "react";
import progress from 'nprogress';
import { CodeCard } from '../../components/CodeCard/CodeCard';
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { CodeModal } from '../../components/CodeModal/CodeModal';
import { CodeModalStateReturns } from '../../components/CodeModal/functions';

export const DashContent = ({ modalState, quickText }: { modalState: CodeModalStateReturns, quickText: string }): ReactElement => {
    // pull codes from the store
    const codes = useSelector((state: AppState) => state.codes)

    // stop the progress bar
    useEffect(() => {
        progress.done()
    }, [])

    return <div className="py-24 container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-16 md:text-4xl">Recently created</h1>
        <div className="flex flex-col w-full max-w-3xl px-8 items-center space-y-8">
            { codes.filter(code => [code.code, code.links[0].url, code.tags].join(' ').includes(quickText)).map(code => <CodeCard key={code.code} code={code} modalState={modalState}></CodeCard> ) }
        </div>

        {/* the code editing modal */}
        <CodeModal modalState={modalState} ></CodeModal>
    </div>
}
