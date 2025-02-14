import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secundary)'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#FFE156',
        secondary: '#613DC1',
        colorBlack: '#1C1C1C',
        colorWhite: '#FAFAFF',
        colorRed: '#F71735'
      },
    },
  },
  plugins: [],
} satisfies Config;
