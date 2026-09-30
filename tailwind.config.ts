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
        primary: {
          DEFAULT: "#0B1F3A",
          dark: "#061325",
          light: "#173763",
          50: "#f0f4f9",
          100: "#d9e2ee",
          500: "#0B1F3A",
          600: "#08172c",
          900: "#040b15",
        },
        secondary: {
          DEFAULT: "#C8A45D",
          light: "#ddbe7d",
          dark: "#a58238",
          50: "#faf7f0",
          100: "#f3ebda",
          500: "#C8A45D",
        },
        bgLight: "#F7F8FA",
        cardBg: "#FFFFFF",
        textMain: "#172033",
        textMuted: "#64748B",
        success: {
          DEFAULT: "#168A5B",
          light: "#eaf6f0",
        },
        warning: {
          DEFAULT: "#D98C10",
          light: "#fdf6ea",
        },
        danger: {
          DEFAULT: "#C73B3B",
          light: "#faecec",
        },
      },
      fontFamily: {
        sans: ["Tajawal", "Cairo", "system-ui", "sans-serif"],
        heading: ["Tajawal", "Cairo", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 31, 58, 0.05)",
        card: "0 10px 30px -4px rgba(11, 31, 58, 0.08)",
        floating: "0 20px 40px -6px rgba(11, 31, 58, 0.12)",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
