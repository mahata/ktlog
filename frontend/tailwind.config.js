/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./src/css/animation.css"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Noto Sans JP", "sans-serif"],
    },
  },
  plugins: [],
};
