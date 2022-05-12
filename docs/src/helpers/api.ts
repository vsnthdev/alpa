/*
 *  Returns an object, by reading parts of the @alpa/api project.
 *  Created On 31 March 2022
 */

import dirname from 'es-dirname'
import fs from 'fs/promises'
import glob from 'glob'
import path from 'path'
import { parse } from 'yaml'

const getRoutePath = (code: string) => {
    const lines = code
        .split('export default {')[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => Boolean(line))

    lines.pop()

    let line = lines.find(line => line.match(/url: /g))
    line = line.slice(5, -1).trim()

    const value = eval(line) as string[]
    return value.length == 0 ? value[0] : value.join(' & ')
}

const getRouteMethod = (code: string) => {
    const lines = code
        .split('export default {')[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => Boolean(line))

    lines.pop()

    let line = lines.find(line => line.match(/method:/g))
    line = line.slice(5, -1).trim()

    const value = eval(line)

    return typeof value == 'string' ? value : value[0]
}

const getRouteDescription = (code: string) => {
    let lines = code.split(' */')[0].split('\n')
    lines.shift()
    lines = lines.filter(line => Boolean(line))

    return lines[0].slice(2).trim()
}

const isAuthRequired = (code: string) => {
    const lines = code
        .split('export default {')[1]
        .split('\n')
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

const readDefaultConfig = async (api: string): Promise<any> => {
    const str = await fs.readFile(path.join(api, 'config.example.yml'), 'utf-8')
    return parse(str)
}

const getApp = async (api: string): Promise<any> => {
    const str = await fs.readFile(path.join(api, 'package.json'), 'utf-8')
    return JSON.parse(str)
}

export default async () => {
    const api = path.join(dirname(), '..', '..', '..', 'api')
    const routeFiles = glob.sync(
        path.join(api, 'src', 'server', 'routes', '**', '**', 'index.ts'),
    )
    const routes = []

    for (const file of routeFiles) {
        const code = await fs.readFile(file, 'utf-8')

        routes.push({
            path: getRoutePath(code),
            method: getRouteMethod(code),
            description: getRouteDescription(code),
            authRequired: isAuthRequired(code),
        })
    }

    return {
        api: {
            routes,
            app: await getApp(api),
            config: await readDefaultConfig(api),
        },
    }
}
