/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { ReactElement, StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './pages/Login';
import { Dash } from './pages/Dash';

export const App = (): ReactElement => <StrictMode>
    <BrowserRouter>
        {/* the header */}
        <Header/>

        {/* the routes link to their pages */}
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/dash' element={<Dash/>}></Route>
        </Routes>
    </BrowserRouter>
</StrictMode>

