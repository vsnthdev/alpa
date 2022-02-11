/*
 *  Entryfile for @alpa/api project.
 *  Created On 30 January 2022
 */

import getLog from './logger.js'
import getConfig from './config/index.js'
import getDatabase from './database.js';
import startServer from './server/index.js';

await getLog()
const config = await getConfig()
const db = await getDatabase(config)
await startServer(config, db)
