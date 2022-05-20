/*
 *  Entryfile for @alpa/api project.
 *  Created On 30 January 2022
 */

import getApp from './app.js'
import getConfig from './config/index.js'
import getDatabase from './database/index.js'
import houseKeeping from './houseKeeping.js'
import getLog from './logger.js'
import startServer from './server/index.js'

await getApp()
await getLog()
await getConfig()
await getDatabase()
await houseKeeping()
await startServer()
