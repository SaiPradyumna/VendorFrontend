/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your framework
    "./public/index.html",       // Add any additional paths where Tailwind will scan for classes
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'], // Custom font for headings
        body: ['Roboto', 'sans-serif'],    // Custom font for body text
        display: ['Playfair Display', 'serif'], // Elegant font for special use
      },
    },
  },
  plugins: [],
};
