/*
 *  Contains interface for a configuration file.
 *  Created On 30 January 2022
 */

export interface AlpaAPIConfig {
    auth: {
        username: string
        email: string
        password: string
    }
    database: {
        host: string
        port: string
        password?: string
        channels: {
            codes: number
            tokens: number
        }
    }
    server: {
        host: string
        port: string
        secret: string
    }
}
