/*
 *  A single code block, which can be edited or modified.
 *  Created On 11 February 2022
 */

import { ReactElement } from "react";
import { Code } from '../../pages/Dash/DashContainer';

export const CodeBlock = ({code}: {code: Code}): ReactElement => <div className="bg-white w-full p-8 rounded-lg flex flex-col">
    <code className="font-mono font-medium text-xl mb-1">{ code.code }</code>
    <a className={`text-sm ${code.tags ? "mb-5" : ""}`} href={code.links[0].url} target="_blank" rel="noopener">{code.links[0].url}</a>
    { code.tags
    ? <div className="flex space-x-2 text-xs">
        {code.tags.map(tag => <span className="cursor-pointer text-white bg-blue-600 px-3 py-1 rounded-full">{tag}</span>)}
    </div>
    : <></> }
</div>
