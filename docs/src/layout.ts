/*
 *  Fetches the layout if specified.
 *  Created On 09 March 2022
 */

import path from 'path'
import fs from 'fs/promises'

export default async (md: string, context: any, content: string) => {
    if (!context.layout) return content

    const layoutFile = path.join(path.dirname(md), context.layout)
    const layout = await fs.readFile(layoutFile, 'utf-8')

    return layout.split('<!-- block:header -->')[0].trim()
        .concat('\n\n')
        .concat(content.trim())
        .concat(layout.split('<!-- block:footer -->')[1]).trim()
        .concat('\n')
}
