/*
 *  Vite bundler configuration for @alpa/app project.
 *  Created On 04 February 2022
 */

import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react';

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
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                tailwindcss()
            ]
        }
    },
    plugins: [
        react(),
        createHtmlPlugin({
            minify: true
        }),
    ]
})
