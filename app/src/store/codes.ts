import { createSlice } from '@reduxjs/toolkit'

interface CodeLink {
    url: string
}

export interface Code {
    code: string
    links: CodeLink[]
    tags: string
}

interface InitialState {
    pages: number
    codes: Code[]
}

const codes = createSlice({
    name: 'codes',
    initialState: {
        pages: 0,
        codes: [],
    } as InitialState,
    reducers: {
        // sets the total number of pages while
        // querying the API for infinite scrolling
        setPages: (state, action) => {
            const { codes } = state

            return {
                codes,
                pages: action.payload,
            }
        },

        // inserts the initial codes into the app store
        insert: (state, action) => {
            const { pages, codes } = state

            return {
                pages,
                codes: codes.concat(action.payload),
            }
        },

        // deletes a given short code given it's code string
        del: (state, action) => {
            const { pages, codes } = state

            return {
                pages,
                codes: codes.filter(
                    (code: Code) => code.code != action.payload,
                ),
            }
        },

        // used to mutate an individual code object
        patch: (state, action) => {
            const { pages, codes } = state

            const index = codes.indexOf(
                codes.find(
                    (code: Code) => code.code == action.payload.code,
                ) as any,
            )

            const newCodes = codes.filter(
                (code: Code) => code.code != action.payload.code,
            )

            newCodes.splice(index, 0, action.payload)

            return {
                pages,
                codes: newCodes,
            }
        },

        // used to update the entire codes array at once
        update: (state, { payload }) => {
            const { pages, codes } = state

            return {
                pages,
                codes: codes.concat(
                    payload.filter(
                        (code: Code) =>
                            Boolean(
                                codes.find((c: Code) => c.code == code.code),
                            ) == false,
                    ),
                ),
            }
        },

        // resets the state to initial and deletes all the
        // data from the frontend
        clear: () => {
            return {
                pages: 0,
                codes: [],
            }
        },
    },
})

export const { insert, clear, del, patch, update, setPages } = codes.actions
export default codes.reducer
