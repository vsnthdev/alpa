/*
 *  TailwindCSS configuration for @alpa/app project.
 *  Created On 08 February 2022
 */

const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx,html}'
    ],
    theme: {
        colors: {
            black: '#000000',
            white: '#FFFFFF',
            slate: colors.slate,
            blue: colors.blue,
            red: colors.red,
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
        }
    }
}
