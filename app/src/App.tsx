/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { ReactElement, StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Dash } from './pages/Dash/DashContainer'
import { Login } from './pages/Login/Login'
import { store } from './store/index.js'

export const App = (): ReactElement => (
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {/* the sidebar */}
                <Sidebar />

                {/* the header */}
                <Header />

                {/* the routes link to their pages */}
                <div className="ml-20 mr-6">
                    <Routes>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/" element={<Dash />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
