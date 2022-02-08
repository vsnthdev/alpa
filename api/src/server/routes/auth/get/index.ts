/*
 *  Fetches the authenticated user's profile information
 *  from Gravatar's API.
 *  Created On 08 February 2022
 */

import { FastifyReply, FastifyRequest } from "fastify"
import { AlpaAPIConfig } from "../../../../config/interface"
import auth from '../../../plugins/auth.js';
import gravatar from 'gravatar';
import axios from 'axios';

const getGravatarImage = (username: string, email: string) => {
    return {
        main: gravatar.url(email, {
            protocol: 'https',
            s: '256',
            r: 'pg',
            d: '404'
        }),
        alt: `https://avatars.dicebear.com/api/croodles-neutral/${username}.svg`
    }
}

const getGravatarProfile = async (email: string) => {
    try {
        const { status, data } = await axios({
            url: gravatar.profile_url(email, {
                protocol: 'https',
                rating: 'pg',
                d: '404',
            })
        })
    
        if (status == 200) return data
        return null
    } catch {
        return null
    }
}

const getHandler = (config: AlpaAPIConfig) => async (req: FastifyRequest, rep: FastifyReply): Promise<any> => {
    const { username, email } = req.user as { [key: string]: string }

    const data = await getGravatarProfile(email)

    const profile = {
        name: data ? data.entry[0].displayName : undefined,
        username,
        email,
        avatar: getGravatarImage(username, email)
    }

    return rep.status(200).send(profile)
}

export default {
    path: '/api/auth',
    method: 'GET',
    opts: {
        preValidation: [auth]
    },
    getHandler,
}
