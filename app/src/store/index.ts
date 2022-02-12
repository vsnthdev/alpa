import { configureStore } from '@reduxjs/toolkit'
import auth, { AuthState } from './auth.js';

export interface AppState {
    auth: AuthState
}

export const store= configureStore({
    reducer: { auth }
})
