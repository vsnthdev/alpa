/*
 *  Reads API routes and prepares an array to be iterated in README.md.
 *  Created On 31 March 2022
 */

import glob from 'glob'
import path from 'path'
import fs from 'fs/promises'
import dirname from 'es-dirname'

const getRoutePath = (code: string) => {
    const lines = code.split('export default {')[1].split('\n')
        .map(line => line.trim())
        .filter(line => Boolean(line))

    lines.pop()

    let line = lines.find(line => line.match(/path: /g))
    line = line.slice(5, -1).trim()
    
    const value = eval(line)

    return typeof value == 'string' ? value : value[0]
}

const getRouteMethod = (code: string) => {
    const lines = code.split('export default {')[1].split('\n')
        .map(line => line.trim())
        .filter(line => Boolean(line))

    lines.pop()

    let line = lines.find(line => line.match(/method:/g))
    line = line.slice(5, -1).trim()
    
    const value = eval(line)

    return typeof value == 'string' ? value : value[0]
}

const isAuthRequired = (code: string) => {
    const lines = code.split('export default {')[1].split('\n')
        .map(line => line.trim())
        .filter(line => Boolean(line))

    lines.pop()

    if (lines.find(line => line.includes('opts: {'))) {
        const others = lines.join(' ').split('opts: {')[1].split('},')[0]
        return others.match(/auth/g) ? true : false
    } else {
        return false
    }
}

export default async () => {
    const api = path.join(dirname(), '..', '..', '..', 'api')
    const routeFiles = glob.sync(path.join(api, 'src', 'server', 'routes', '**', '**', 'index.ts'))
    const routes = []

    for (const file of routeFiles) {
        const code = await fs.readFile(file, 'utf-8')
        
        routes.push({
            path: getRoutePath(code),
            method: getRouteMethod(code),
            authRequired: isAuthRequired(code)
        })

    }

    return {
        api: {
            routes,
        }
    }
}
