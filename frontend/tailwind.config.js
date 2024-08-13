/** @type {import('tailwindcss').Config} */
import  flowbite from "flowbite-react/tailwind";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
  
}

