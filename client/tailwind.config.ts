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
        school: {
          primary: "#166534",       // Deep Heritage Green
          "primary-dark": "#14532D",
          "primary-light": "#15803D",
          secondary: "#1D4ED8",     // Professional Academic Blue
          "secondary-dark": "#1E40AF",
          "secondary-light": "#3B82F6",
          accent: "#22C55E",        // Soft vibrant green accent
          bg: "#FFFFFF",
          "soft-bg": "#F8FAFC",
          text: "#0F172A",
          muted: "#475569",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 25px -5px rgba(22, 101, 52, 0.08), 0 8px 10px -6px rgba(29, 78, 216, 0.05)",
        "card-hover": "0 20px 30px -10px rgba(22, 101, 52, 0.15), 0 10px 15px -5px rgba(29, 78, 216, 0.1)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
