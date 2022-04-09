/*
 *  Vite bundler configuration for @alpa/app project.
 *  Created On 04 February 2022
 */

import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

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
        VitePWA({
            manifest: {
                name: 'alpa',
                short_name: 'alpa',
                id: 'dev.vsnth.alpa',
                description: 'A fast ⚡ self-hosted link 🔗 shortener.',
                orientation: 'portrait-primary',
                theme_color: '#FFFFFF',
                start_url: '/',
                icons: [
                    {
                        src: '/icon.svg',
                        sizes: '791x791',
                        type: 'image/svg',
                        purpose: 'maskable'
                    },
                    {
                        src: '/icon.png',
                        sizes: '791x791',
                        type: 'image/png'
                    },
                ],
            },
            includeAssets: ['/cover.png', '/.well-known/assetlinks.json']
        })
    ]
})
