/*
 *  Creates a new short code.
 *  Created On 03 February 2022
 */

import boom from 'boom'
import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '../../../../database/index.js'
import auth from '../../../plugins/auth.js'

export interface CodeLink {
    title: string
    icon: string
    image: string
    url: string
}

export interface Code {
    code?: string
    tags: string
    links: CodeLink[]
}

const handler = async (req: FastifyRequest, rep: FastifyReply) => {
    const body = req.body as Code
    const code = body.code
    const query = req.query as any
    delete body.code

    if (code == 'api')
        throw boom.notAcceptable('A code named api cannot be created.')

    const exists = await db.codes.exists(code)
    if (exists && Boolean(query['force']) == false)
        throw boom.conflict('That code already exists')

    await db.codes.json.set(code, '$', body)

    if (exists) {
        return rep.status(200).send({
            message: 'Updated the code',
        })
    } else {
        // fetch the last value in sorted list and it's score
        let lastScore: number
        try {
            const [last] = await db.config.zRangeWithScores('codes', 0, 0, {
                REV: true,
            })

            lastScore = last.score
        } catch {
            lastScore = 0
        }

        // add the newly created code to our sorted set
        await db.config.zAdd('codes', { score: lastScore + 1, value: code })

        return rep.status(201).send({
            message: 'Created a new code',
        })
    }
}

export default {
    handler,
    method: 'POST',
    url: ['/api/codes'],
    preValidation: [auth],
}
