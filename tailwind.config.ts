import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      base: "1rem",
      lg: "1.0625rem",
      xl: "1.125rem",
      "2xl": "1.25rem",
      "3xl": "1.5rem",
      "4xl": "1.875rem",
      "5xl": "2.25rem",
      "6xl": "3rem",
    },
    colors: {
      gray: {
        "50": "#f6f6f7",
        "100": "#efeff0",
        "200": "#e1e2e4",
        "300": "#c7c8cc",
        "400": "#bababf",
        "500": "#a6a7ae",
        "600": "#929299",
        "700": "#7e7d85",
        "800": "#67676c",
        "900": "#56555a",
        "950": "#323234",
      },
      green: {
        "50": "#ecfdf8",
        "100": "#d1faed",
        "200": "#a7f3db",
        "300": "#6ee7c1",
        "400": "#34d3a2",
        "500": "#10b985",
        "600": "#059669",
        "700": "#047854",
        "800": "#065f43",
        "900": "#064e38",
        "950": "#022c1f",
      },
      orange: {
        "50": "#fff7ed",
        "100": "#ffecd4",
        "200": "#ffd5a8",
        "300": "#ffb771",
        "400": "#ff8225",
        "500": "#fe6c11",
        "600": "#ef5207",
        "700": "#c63b08",
        "800": "#9d300f",
        "900": "#7e2910",
        "950": "#441206",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        basic: "0 5px 15px -10px rgba(150,170,180,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
