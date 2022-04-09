/*
 *  Fetches my actual Twitter username using alpa & mahat.
 *  Created On 10 March 2022
 */

import path from 'path'
import axios from 'axios'

export default async () => {
    try {
        await axios({
            method: 'GET',
            url: `https://vas.cx/twitter`,
            maxRedirects: 0,
        })
    } catch ({ response: { status, headers } }) {
        if (status == 307) return {
            twitterUsername: path.parse(headers.location).base
        }
    }
}
