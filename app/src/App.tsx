/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { ReactElement, StrictMode, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './pages/Login/Login';
import { Dash } from './pages/Dash/DashContainer';
import { Provider } from 'react-redux';
import {store} from './store/index.js';

export const App = (): ReactElement => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    return <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {/* the header */}
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

                {/* the routes link to their pages */}
                <Routes>
                    <Route path='/' element={<Login/>}></Route>
                    <Route path='/dash' element={<Dash setIsLoggedIn={setIsLoggedIn}/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
}

