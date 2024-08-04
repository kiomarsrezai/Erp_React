/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(255, 152, 0)',
                dark: '#131517',
                dark2: '#1f2125',
                dark3: '#2e3036',
            }
        },
    },
    plugins: [],
}

