/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.jsx"],
  theme: {
    extend: {
      maxWidth: {
        '90': '90%',
      }
    },
  },
  plugins: [],
}

