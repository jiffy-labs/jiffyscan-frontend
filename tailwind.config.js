const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["'Roboto'", ...fontFamily.sans],
            },
            colors: {
                red: '#FF0420',
                blue: {
                    200: '#1976D2',
                },
                dark: {
                    25: '#FDFDFD',
                    50: '#FAFAFA',
                    100: '#ECEFF1',
                    200: '#B0BEC5',
                    300: '#90A4AE',
                    400: '#607D8B',
                    500: '#546E7A',
                    600: '#263238',
                    700: '#212121',
                },
                bluegrey:{
                    300:'#455A64',
                },
            },
            boxShadow: {
                100: `box-shadow: 0px 2px 1px 0px #00000033`,
                200: `0px 2px 1px rgba(0, 0, 0, 0.2)`,
                300: `0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)`,
            },
        },
        fontSize: {
            sm: ['12px', { lineHeight: '20px', letterSpacing: '0.4px' }],
            md: ['14px', { lineHeight: '20px', letterSpacing: '0em' }],
            lg: ['15px', { lineHeight: '28px', letterSpacing: '0.15px' }],
            base: ['16px', { lineHeight: '24px', letterSpacing: '0.5px' }],
            xl: ['20px', { lineHeight: '28px', letterSpacing: '0em' }],
            '2xl': ['18px', { lineHeight: '18px', letterSpacing: '0em' }],
            '3xl': ['34px', { lineHeight: '40px', letterSpacing: '0.25px' }],
        },
        container: {
            center: true,
            padding: '1rem',
        },
        screens: {
            sm: '500px',
            md: '768px',
            lg: '992px',
            xl: '1264px',
        },
    },
    plugins: [],
};
