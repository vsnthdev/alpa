/*
 *  Entry TypeScript file for @alpa/app.
 *  Created On 04 February 2022
 */

import './index.css'
import './nprogress.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/dist/border.css'

import ReactDOM from 'react-dom'

import { App } from './App'

ReactDOM.render(<App />, document.querySelector('#app'))

const { registerSW } = await import('virtual:pwa-register')
registerSW({
    immediate: true,
})
