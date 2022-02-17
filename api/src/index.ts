/*
 *  Entryfile for @alpa/api project.
 *  Created On 30 January 2022
 */

import getApp from './app.js';
import getLog from './logger.js'
import getConfig from './config/index.js'
import getDatabase from './database.js';
import startServer from './server/index.js';

await getApp()
await getLog()
await getConfig()
await getDatabase()
await startServer()
