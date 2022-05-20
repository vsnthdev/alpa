/*
 *  Validates the user input to only accept allowed config keys.
 *  Created On 11 May 2022
 */

import Ajv, { JSONSchemaType } from 'ajv'

export interface Schema {
    server?: {
        host?: string
        port?: number
        cors?: string[]
    }
}

const schema: JSONSchemaType<Schema> = {
    type: 'object',
    // additionalProperties: false,
    properties: {
        server: {
            type: 'object',
            nullable: true,
            additionalProperties: false,
            properties: {
                host: {
                    type: 'string',
                    nullable: true,
                },
                port: {
                    type: 'number',
                    nullable: true,
                },
                cors: {
                    type: 'array',
                    nullable: true,
                    minItems: 1,
                    items: {
                        type: 'string',
                        minLength: 4,
                    },
                },
            },
        },
    },
}

export default new Ajv().compile(schema)
