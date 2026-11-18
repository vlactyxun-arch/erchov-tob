import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/{accordion,button,chip,divider,spinner}.js",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FDFAF6",
        ink: "#1F1A14",
        accent: "#A94731",
        sand: "#E8B39F",
        sage: "#6B7A5A",
        gold: "#C9A227",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
      },
      maxWidth: { site: "1240px" },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FDFAF6",
            foreground: "#1F1A14",
            primary: { DEFAULT: "#A94731", foreground: "#FFFFFF" },
            focus: "#A94731",
          },
        },
      },
    }),
  ],
} satisfies Config;
