/*
 *  Writes the README.md file for the entire project at the root.
 *  Created On 08 March 2022
 */

import { generics, read, write } from './util.js';

const config = {
    in: '../templates/README.md',
    out: '../../README.md'
}

const template = await read(config)

await write(config, generics(template))
