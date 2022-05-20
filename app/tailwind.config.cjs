/*
 *  TailwindCSS configuration for @alpa/app project.
 *  Created On 08 February 2022
 */

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
    theme: {
        fontFamily: {
            sans: [
                'Plus Jakarta Sans',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
            ],
            mono: [
                'IBM Plex Mono',
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
        },
        extend: {
            colors: {
                primary: '#EF233C',
                'primary-hover': '#D11026',
                secondary: '#1C1917',
                'secondary-hover': '#5A5049',
            },
        },
    },
}
