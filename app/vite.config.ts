/*
 *  Vite bundler configuration for @alpa/app project.
 *  Created On 04 February 2022
 */

import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
    clearScreen: false,
    root: 'src',
    build: {
        outDir: '../dist',
        minify: 'esbuild',
        target: 'esnext',
        polyfillModulePreload: false
    },
    server: {
        fs: {
            strict: false
        }
    },
    plugins: [
        createHtmlPlugin({
            minify: true
        })
    ]
})
