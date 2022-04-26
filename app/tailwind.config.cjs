/*
 *  TailwindCSS configuration for @alpa/app project.
 *  Created On 08 February 2022
 */

const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
    theme: {
        colors: {
            white: '#FFFFFF',
            slate: colors.slate,
            primary: '#EF233C',
            'primary-hover': '#D11026',
            secondary: '#1C1917',
            'secondary-hover': '#5A5049',
        },
        fontFamily: {
            body: [
                'Sora',
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
        },
    },
}
