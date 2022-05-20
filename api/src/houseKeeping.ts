/*
 *  Performs maintenance tasks to maintain database & it's data
 *  as @alpa/api grows and changes how database is handled.
 *  Created On 20 May 2022
 */

import createSearchIndex from './database/houseKeeping/createSearchIndex/index.js'
import reflectSortedList from './database/houseKeeping/reflectSortedList/index.js'

export default async (): Promise<void> => {
    await Promise.all([createSearchIndex(), reflectSortedList()])
}
