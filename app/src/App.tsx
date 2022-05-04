/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { ReactElement, StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { Dash } from './pages/Dash/DashContainer'
import { Login } from './pages/Login/Login'
import { store } from './store/index.js'

export const App = (): ReactElement => (
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="app">
                {/* the header */}
                <Header />

                {/* the routes link to their pages */}
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Dash />}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
