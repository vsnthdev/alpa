/*
 *  Reads all the projects in this repo to be used within README.md.
 *  Created On 31 March 2022
 */

import fs from 'fs/promises'
import path from 'path'
import dirname from 'es-dirname'

const excludes = ['node_modules']

export default async () => {
    const root = path.join(dirname(), '..', '..', '..')
    const files = await fs.readdir(root, { 
         withFileTypes: true
    })

    const projects = files
        .filter(file => {
            // only allow folder
            const outcomes = [file.isDirectory(), !excludes.includes(file.name), file.name.charAt(0) != '.']

            return !outcomes.includes(false)
        })
        .map(file => file.name)

    const returnable = []
    
    for (const project of projects) {
        const data = await fs.readFile(path.join(root, project, 'package.json'), 'utf-8')
        returnable.push({...JSON.parse(data), ...{ projectName: project }})
    }

    return {
        projects: returnable
    }
}
