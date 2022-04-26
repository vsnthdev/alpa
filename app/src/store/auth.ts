import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
    username: string
    email: string
    isLoggedIn: boolean
    apiHost: string
    apiToken: string
}

const initialState = {
    isLoggedIn: false,
}

const user = createSlice({
    initialState,
    name: 'user',
    reducers: {
        login: (state, action) => ({ ...state, ...action.payload }),
        logout: () => initialState,
    },
})

export const { login, logout } = user.actions
export default user.reducer
