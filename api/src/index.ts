/*
 *  Entryfile for @alpa/api project.
 *  Created On 30 January 2022
 */

import getLog from './logger.js'
import getConfig from './config/index.js'

const log = await getLog()
const config = await getConfig(log)
