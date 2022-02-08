/*
 *  Contains routes which are used by solid-app-router.
 *  Created On 08 February 2022
 */

import Login from './pages/Login'
import { lazy } from 'solid-js';

export const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/dash',
        component: lazy(() => import('./pages/Dash'))
    }
]
