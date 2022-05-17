import { configureStore } from '@reduxjs/toolkit'

import auth, { AuthState } from './auth.js'
import codes, { Code } from './codes.js'

export interface AppState {
    auth: AuthState
    codes: {
        pages: number
        codes: Code[]
    }
}

export const store = configureStore({
    reducer: { auth, codes },
})
