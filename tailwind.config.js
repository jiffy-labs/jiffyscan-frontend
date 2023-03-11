/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [],
    theme: {
        extend: {
            colors: {
                'jiffy-dark-grey': '#263238',
                'jiffy-light-grey': '#FAFAFA',
                'jiffy-grey-subtitle': '#B0BEC5',
            },
        },
    },
};
