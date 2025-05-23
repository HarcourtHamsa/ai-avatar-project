/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cOrange: "#FD5C02",
        cBlack: "#1A1A1A",
        cLightOrange: "#FFF9F6",
        cWhite: "#FFF9F6",
        cGray: "#667085",
        cPink: "#FC52E4",
      },
    },
  },
  plugins: [],
};
