/*
 *  A modal for editing a short code.
 *  Created On 12 February 2022
 */

import { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tag, WithContext as ReactTags } from 'react-tag-input'

import { AppState } from '../../store'
import { Code } from '../../store/codes'
import {
    applyAction,
    cancelAction,
    CodeModalStateReturns,
    generateCodeString,
} from '.'

const tagsTransformerUp = (tags: string): Tag[] =>
    tags
        .split(';')
        .filter(str => Boolean(str))
        .map(str => {
            return {
                id: str,
                text: str,
            }
        })

const tagsTransformerDown = (tags: Tag[]): string =>
    tags.map(tag => tag.text.trim()).join(';')

interface CodeModalOptions {
    modalState: CodeModalStateReturns
}

export const CodeModal = ({ modalState }: CodeModalOptions): ReactElement => {
    const { code, isOpen, setCode, isCreatingNew } = modalState
    const dispatch = useDispatch()
    const auth = useSelector((state: AppState) => state.auth)

    const handleAddition = (tag: Tag) => {
        const newTags = tagsTransformerUp(code.tags)
        newTags.push(tag)

        setCode({ ...code, ...{ tags: tagsTransformerDown(newTags) } } as Code)
    }

    const handleDelete = (index: number) => {
        const newTags = tagsTransformerUp(code.tags)
        newTags.splice(index, 1)
        setCode({ ...code, ...{ tags: tagsTransformerDown(newTags) } } as Code)
    }

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = tagsTransformerUp(code.tags)
        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)
        setCode({ ...code, ...{ tags: tagsTransformerDown(newTags) } } as Code)
    }

    const setCodeValue = (codeString: string) =>
        setCode({ ...code, ...{ code: codeString } } as Code)
    const setTarget = (targetURL: string) =>
        setCode({ ...code, ...{ links: [{ url: targetURL }] } } as Code)

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0'
            } ${isOpen || 'pointer-events-none'}`}
            onKeyDown={e => e.code == 'Escape' && cancelAction(modalState)}
        >
            <div className="flex justify-center items-center min-h-screen pt-4 px-8 pb-20 text-center">
                <div
                    className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity"
                    onClick={() => cancelAction(modalState)}
                ></div>

                <div className="w-full inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg">
                    <div className="bg-neutral-100 relative pl-6 pr-6 pt-8 sm:pl-7.5 sm:pr-8">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto z-10 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/[0.1] sm:ml-0 sm:mr-1 sm:h-10 sm:w-10">
                                {isCreatingNew ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="w-full z-10 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-2xl font-bold text-neutral-900"
                                    id="modal-title"
                                >
                                    {isCreatingNew
                                        ? `Creating ${code.code}`
                                        : `Edit ${code.code}`}
                                </h3>
                                <div className="mt-6">
                                    {isCreatingNew && (
                                        <div className="w-full flex flex-col space-y-2">
                                            <label className="ml-0.5 mr-auto">
                                                Code
                                            </label>
                                            <div className="flex px-3 py-2 border-2 transition-colors rounded-xl bg-white border-neutral-200 focus-within:border-neutral-500">
                                                <input
                                                    className="w-full outline-none transition-colors"
                                                    type="text"
                                                    id="code"
                                                    placeholder="The short code"
                                                    value={code.code}
                                                    onChange={e =>
                                                        setCodeValue(
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <button
                                                    className="pl-2 transition-colors outline-none text-neutral-400 hover:text-neutral-600 focus:text-neutral-600 active:text-black"
                                                    onClick={() =>
                                                        setCodeValue(
                                                            generateCodeString(),
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`w-full flex flex-col space-y-2 ${
                                            isCreatingNew && 'mt-4'
                                        }`}
                                    >
                                        <label className="ml-0.5 mr-auto">
                                            Target
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 border-2 outline-none transition-colors border-neutral-200 focus:border-neutral-500 rounded-xl"
                                            type="text"
                                            id="target"
                                            placeholder="URL you want to redirect to"
                                            value={
                                                code.links
                                                    ? code.links[0].url
                                                    : ''
                                            }
                                            onChange={e =>
                                                setTarget(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mt-4 w-full flex flex-col space-y-2">
                                        <label className="ml-0.5 mr-auto">
                                            Tags
                                        </label>
                                        <div className="bg-white w-full px-3 py-2 border-2 outline-none transition-colors border-neutral-200 focus-within:border-neutral-500 rounded-xl">
                                            <ReactTags
                                                tags={tagsTransformerUp(
                                                    code.tags,
                                                )}
                                                handleAddition={handleAddition}
                                                handleDelete={handleDelete}
                                                handleDrag={handleDrag}
                                                classNames={{
                                                    tagInputField:
                                                        'outline-none w-full px-1 my-1',
                                                    remove: 'outline-none pb-[3px] pl-[3px]',
                                                    tag: 'bg-neutral-100 border mb-2 mx-0.5 px-3 py-1 text-xs inline-flex items-center justify-center rounded-full',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* background elements */}
                        <div className="hidden absolute w-96 -bottom-64 -left-52 aspect-square bg-gradient-to-br from-white to-neutral-100 rounded-full shadow-2xl shadow-neutral-200 sm:inline-block"></div>
                        <div className="hidden absolute w-96 -top-60 -right-52 aspect-square bg-gradient-to-tr from-white to-neutral-100 rounded-full shadow-2xl shadow-neutral-100 sm:inline-block"></div>
                    </div>

                    <div className="bg-neutral-100 px-6 pt-6 pb-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row-reverse sm:pb-7 sm:px-8">
                        <a
                            className="block ml-3"
                            onClick={() =>
                                applyAction(modalState, dispatch, auth)
                            }
                        >
                            <button
                                type="button"
                                className="bg-primary hover:bg-primary-hover border-2 border-neutral-100 text-white font-semibold w-full px-4 pt-2 pb-[9px] rounded-lg transition focus:outline-none active:transform-gpu active:scale-95 focus:scale-95 sm:text-sm"
                            >
                                {isCreatingNew ? 'Create' : 'Apply'}
                            </button>
                        </a>
                        <a
                            className="block"
                            onClick={() => cancelAction(modalState)}
                        >
                            <button
                                type="button"
                                className="bg-white hover:bg-neutral-200 border-2 text-black w-full px-4 pt-2 pb-[9px] rounded-lg transition focus:outline-none active:transform-gpu active:scale-95 sm:text-sm"
                            >
                                Cancel
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
