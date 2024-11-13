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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#CBBCA5",
        tertiary:"#AB0000"
      },
      maxWidth: {
        'max-4xl': '4000px',  // Añadir un tamaño personalizado
      },
    },
  },
  plugins: [],
};

export default config;
