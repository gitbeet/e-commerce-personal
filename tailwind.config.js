/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      // prettier-ignore
      "hover-hover": { "raw": "(hover: hover)" },
    },
    colors: {
      "primary-500": "hsla(30, 100%, 55%, 1)",
      "primary-600": "hsla(33, 100%, 62%, 1)",

      "secondary-500": "hsla(205, 100%, 39%, 1)",
      "secondary-600": "hsla(205, 100%, 59%, 1)",

      "neutral-200": "hsla(215, 55%, 4%, 1)",
      "neutral-400": "hsla(216, 10%, 35%, 1)",
      "neutral-500": "hsla(216, 10%, 55%, 1)",
      "neutral-600": "hsla(216, 10%, 65%, 1)",
      "neutral-800": "hsla(216, 10%, 91%, 1)",

      "neutral-900": "hsla(0,0%,100%,1)",

      "danger-500": "hsla(0, 100%, 48%, 1)",
      "danger-600": "hsla(0, 100%, 63%, 1)",
    },
  },
  plugins: [],
};
