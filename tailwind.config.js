/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

