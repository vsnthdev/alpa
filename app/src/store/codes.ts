import { createSlice } from '@reduxjs/toolkit';

interface CodeLink {
    url: string
}

export interface Code {
    code: string
    links: CodeLink[]
    tags: string
}

const codes = createSlice({
    name: 'codes',
    initialState: [],
    reducers: {
        insert: (state, action) => state.concat(action.payload),
        del: (state, action) => state.filter((code: Code) => code.code != action.payload.code),
        patch: (state, action) => [ action.payload as never ].concat(state.filter((code: Code) => code.code != action.payload.code)),
        update: (state, { payload }) => state.concat(payload.filter((code: Code) => Boolean(state.find((c: Code) => c.code == code.code)) == false)),
        clear: () => []
    }
})

export const { insert, clear, del, patch, update } = codes.actions
export default codes.reducer
