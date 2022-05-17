/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { ReactElement, StrictMode, useState } from 'react'
import { HotKeys } from 'react-hotkeys'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { prepareModalState } from './components/CodeModal'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Topbar } from './components/Topbar/Topbar'
import { Dash } from './pages/Dash/Dash'
import { Login } from './pages/Login/Login'
import { store } from './store/index.js'
import { hotkeyHandlers, hotkeyMap } from './util/hotkeys'

export const App = (): ReactElement => {
    const [loading, setLoading] = useState(true)
    const [quickText, setQuickText] = useState('')

    // prepare modal's required state
    const modalState = prepareModalState()

    return (
        <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <HotKeys
                        className="h-full"
                        keyMap={hotkeyMap}
                        handlers={hotkeyHandlers}
                    >
                        {/* the sidebar */}
                        <Sidebar modalState={modalState} />

                        {/* the routes link to their pages */}
                        <div className="h-full ml-20 mr-6 md:ml-24 md:mr-8 lg:ml-28 lg:mr-12 xl:ml-0 xl:mr-0">
                            {/* the topbar */}
                            <Topbar
                                loading={loading}
                                quickText={quickText}
                                setQuickText={setQuickText}
                                setLoading={setLoading}
                            />

                            <Routes>
                                <Route
                                    path="/login"
                                    element={<Login />}
                                ></Route>
                                <Route
                                    path="/"
                                    element={
                                        <Dash
                                            loading={loading}
                                            quickText={quickText}
                                            setQuickText={setQuickText}
                                            setLoading={setLoading}
                                            modalState={modalState}
                                        />
                                    }
                                ></Route>
                            </Routes>
                        </div>
                    </HotKeys>
                </BrowserRouter>
            </Provider>
        </StrictMode>
    )
}
