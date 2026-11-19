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
        paper: "#F7EFD9",
        ink: "#28342A",
        accent: "#16463D",
        sand: "#EFE2C4",
        sage: "#E0E8D8",
        gold: "#A67537",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: { site: "1240px" },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F7EFD9",
            foreground: "#28342A",
            primary: { DEFAULT: "#16463D", foreground: "#FFF8E7" },
            focus: "#16463D",
          },
        },
      },
    }),
  ],
} satisfies Config;
