/*
 *  The dashboard where you can create, edit and delete short links.
 *  Created On 11 February 2022
 */

import { ReactElement, useEffect } from "react";
import progress from 'nprogress';

export const DashContent = ({profile}: { profile: any}): ReactElement => {
    // stop the progress bar
    useEffect(() => {
        progress.done()
        console.log(profile)
    }, [])

    return <><h1>Welcome {profile.username}</h1></>
}
