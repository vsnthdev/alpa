/*
 *  The App shell that encapsulating the entire application.
 *  Created On 08 February 2022
 */

import { routes } from './routes';
import { useRoutes } from 'solid-app-router';
import { Header } from './components/Header/Header';

export const App = () => {
    // load up the configured routes
    const Routes = useRoutes(routes)

    return (<>
        {/* The header component */}
        <Header />

        <Routes/>
    </>)
}
