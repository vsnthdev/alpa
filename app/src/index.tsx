/*
 *  Entry TypeScript file for @alpa/app.
 *  Created On 04 February 2022
 */

import { App } from './App';
import { Router } from 'solid-app-router';
import { render } from 'solid-js/web'
import './index.css';

render(() => <Router><App/></Router>, document.body)
