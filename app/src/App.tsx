/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { ReactElement, StrictMode, useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Sidebar } from './components/Sidebar/Sidebar'
import { Topbar } from './components/Topbar/Topbar'
import { Dash } from './pages/Dash/DashContainer'
import { Login } from './pages/Login/Login'
import { store } from './store/index.js'

export const App = (): ReactElement => {
    const [loading, setLoading] = useState(true)
    const [quickText, setQuickText] = useState('')

    return (
        <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    {/* the sidebar */}
                    <Sidebar />

                    {/* the routes link to their pages */}
                    <div className="ml-20 mr-6 md:ml-24 md:mr-8 lg:ml-28 lg:mr-12 xl:ml-0 xl:mr-0">
                        {/* the topbar */}
                        <Topbar
                            loading={loading}
                            quickText={quickText}
                            setQuickText={setQuickText}
                        />

                        <Routes>
                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/"
                                element={
                                    <Dash
                                        loading={loading}
                                        quickText={quickText}
                                        setQuickText={setQuickText}
                                        setLoading={setLoading}
                                    />
                                }
                            ></Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </Provider>
        </StrictMode>
    )
}
