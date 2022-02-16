/*
 *  Entry TypeScript file for @alpa/app.
 *  Created On 04 February 2022
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './index.css';
import 'nprogress/nprogress.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/border.css';

ReactDOM.render(<App/>, document.querySelector('#app'))
