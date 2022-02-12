/*
 *  The dashboard where you can create, edit and delete short links.
 *  Created On 11 February 2022
 */

import { ReactElement, useEffect, useState } from "react";
import progress from 'nprogress';
import { CodeCard } from '../../components/CodeCard/CodeCard';
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { CodeModal } from '../../components/CodeModal/CodeModal';

export const DashContent = (): ReactElement => {
    // pull codes from the store
    const codes = useSelector((state: AppState) => state.codes)

    const [ isOpen, setIsOpen ] = useState(false)

    const openModal = () => {
        // show the modal dialog
        setIsOpen(true)
    }

    // stop the progress bar
    useEffect(() => {
        progress.done()
    }, [])

    return <div className="py-24 container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-16 md:text-4xl">Recently created</h1>
        <div className="flex flex-col w-full max-w-3xl px-8 items-center space-y-8">
            { codes.map(code => <CodeCard key={code.code} code={code} openModal={openModal}></CodeCard> ) }
        </div>

        {/* the code editing modal */}
        <CodeModal isOpen={isOpen} setIsOpen={setIsOpen}></CodeModal>
    </div>
}
