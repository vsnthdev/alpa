import { createSlice } from '@reduxjs/toolkit';

interface CodeLink {
    url: string
}

export interface Code {
    code: string
    links: CodeLink[]
    tags: string[]
}

const codes = createSlice({
    name: 'codes',
    initialState: [],
    reducers: {
        insert: (state, action) => state.concat(action.payload),
        del: (state, action) => state.filter((code: Code) => code.code != action.payload.code),
        clear: () => []
    }
})

export const { insert, clear } = codes.actions
export default codes.reducer
