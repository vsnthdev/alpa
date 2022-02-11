/*
 *  The dashboard where you can create, edit and delete short links.
 *  Created On 11 February 2022
 */

import { ReactElement, useEffect } from "react";
import progress from 'nprogress';
import { CodeResponse } from './DashContainer';

export const DashContent = ({codes}: { codes: CodeResponse}): ReactElement => {
    // stop the progress bar
    useEffect(() => {
        progress.done()
    }, [])

    return <><h1>Welcome {JSON.stringify(codes.codes)}</h1></>
}
