import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        futsal: {
          // Primary — deep navy (futsal.com / US Futsal main brand color)
          navy: "#0d1b3e",
          navylight: "#162450",
          // Accent — bold red (futsal.com secondary)
          red: "#c0392b",
          redlight: "#e74c3c",
          // Supporting
          white: "#ffffff",
          offwhite: "#f5f7fa",
          gray: "#eef1f6",
          darkgray: "#6b7280",
          // Kenya flag green (used sparingly for Kenya context)
          green: "#006b3f",
          gold: "#bb9900",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
