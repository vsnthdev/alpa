/*
 *  The dashboard where you can create, edit and delete short links.
 *  Created On 11 February 2022
 */

import progress from 'nprogress'
import { Dispatch, ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { CodeCard } from '../../components/CodeCard/CodeCard'
import { CodeModal } from '../../components/CodeModal/CodeModal'
import { CodeModalStateReturns } from '../../components/CodeModal/functions'
import { AppState } from '../../store'
import { Code } from '../../store/codes'

export const DashContent = ({
    loading,
    quickText,
    searchAPI,
    modalState,
    setQuickText,
}: {
    loading: boolean
    quickText: string
    searchAPI: () => Promise<void>
    modalState: CodeModalStateReturns
    setQuickText: Dispatch<React.SetStateAction<string>>
}): ReactElement => {
    // pull codes from the store
    const codes = useSelector((state: AppState) => state.codes).filter(code =>
        [code.code, code.links[0].url, code.tags]
            .join(' ')
            .replace(/;/g, ' ')
            .match(new RegExp(quickText.trim(), 'gi')),
    )

    // stop the progress bar
    useEffect(() => {
        progress.done()
    }, [])

    return (
        <div
            className={`pb-24 container mx-auto flex flex-col items-center transition-opacity ${
                loading ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <h1 className="text-3xl font-bold mb-10 md:text-4xl">
                Recently created
            </h1>
            <div className="flex flex-col w-full max-w-6xl items-center space-y-8 lg:space-y-0">
                {codes.map((code: Code, index: number) => (
                    <div
                        key={index}
                        className="bg-white w-full flex flex-col rounded-xl overflow-hidden shadow-2xl shadow-neutral-200 lg:rounded-none first-of-type:rounded-t-xl last-of-type:rounded-b-xl"
                    >
                        <CodeCard
                            code={code}
                            searchAPI={searchAPI}
                            modalState={modalState}
                            setQuickText={setQuickText}
                        ></CodeCard>
                        {index + 1 != codes.length && (
                            <div className="mx-16">
                                <hr className="hidden border-neutral-200 lg:block" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* the code editing modal */}
            <CodeModal modalState={modalState}></CodeModal>
        </div>
    )
}
