import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
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
      white: "#ffffff",
      black: "#000000",
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
      lime: {
        "50": "#fbfbea",
        "100": "#f5f5d2",
        "200": "#eaecaa",
        "300": "#d9df77",
        "400": "#c2cb43",
        "500": "#a8b32f",
        "600": "#838f21",
        "700": "#646d1e",
        "800": "#50571d",
        "900": "#434a1d",
        "950": "#23280b",
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
      blue: {
        "50": "#f1f9fe",
        "100": "#e2f1fc",
        "200": "#bee3f9",
        "300": "#84cdf5",
        "400": "#43b4ed",
        "500": "#1b9adc",
        "600": "#0d7bbc",
        "700": "#0c6298",
        "800": "#0e547e",
        "900": "#134b70",
        "950": "#0c2c45",
      },
      teal: {
        "50": "#f1f9fa",
        "100": "#dceef1",
        "200": "#bddfe4",
        "300": "#90c7d0",
        "400": "#64abb9",
        "500": "#408a9a",
        "600": "#387282",
        "700": "#325d6c",
        "800": "#304f5a",
        "900": "#2c434d",
        "950": "#192b33",
      },
      pink: {
        "50": "#fef1fa",
        "100": "#fee5f6",
        "200": "#ffcbef",
        "300": "#ffa1e0",
        "400": "#ff76ce",
        "500": "#fa3ab0",
        "600": "#ea188e",
        "700": "#cc0a72",
        "800": "#a80c5e",
        "900": "#8c0f50",
        "950": "#56012d",
      },
      magenta: {
        "50": "#f7f4fe",
        "100": "#efebfc",
        "200": "#e1dafa",
        "300": "#cbbcf6",
        "400": "#b196ef",
        "500": "#986be7",
        "600": "#894bdc",
        "700": "#8043cb",
        "800": "#652fa8",
        "900": "#54288a",
        "950": "#34185d",
      },
      indigo: {
        "50": "#f1f4fd",
        "100": "#e0e8f9",
        "200": "#c9d6f4",
        "300": "#a4bdec",
        "400": "#7899e2",
        "500": "#5d7cda",
        "600": "#445dcc",
        "700": "#3a4bbb",
        "800": "#353f98",
        "900": "#2f3879",
        "950": "#20244b",
      },
      error: {
        "50": "#ffeff2",
        "100": "#ffdbe1",
        "200": "#ffbcc8",
        "300": "#ff8ea2",
        "400": "#ff4d6d",
        "500": "#ff1740",
        "600": "#ff002e",
        "700": "#e30029",
        "800": "#ba0021",
        "900": "#9a031e",
        "950": "#55000f",
      },
      warning: {
        "50": "#fffaeb",
        "100": "#fff2c6",
        "200": "#ffe388",
        "300": "#ffd35a",
        "400": "#ffba20",
        "500": "#f99707",
        "600": "#dd7002",
        "700": "#b74d06",
        "800": "#943b0c",
        "900": "#7a310d",
        "950": "#461802",
      },
      success: {
        "50": "#f3fbea",
        "100": "#e4f5d2",
        "200": "#c8eda9",
        "300": "#a1dd70",
        "400": "#85ce4d",
        "500": "#67b32f",
        "600": "#4d8f21",
        "700": "#3c6d1e",
        "800": "#33571d",
        "900": "#2d4a1d",
        "950": "#15280b",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "gradient-green-50-100": "linear-gradient(180deg, #ecfdf8 0%, #d1faed 100%)",
        "gradient-green-50-100-reverse": "linear-gradient(180deg, #d1faed 0%, #ecfdf8 100%)",
        "gradient-green-50-200": "linear-gradient(180deg, #ecfdf8 0%, #a7f3db 100%)",
        "gradient-green-50-200-reverse": "linear-gradient(180deg, #a7f3db 0%, #ecfdf8 100%)",
        "gradient-green-100-200": "linear-gradient(180deg, #d1faed 0%, #a7f3db 100%)",
        "gradient-green-100-200-reverse": "linear-gradient(180deg, #a7f3db 0%, #d1faed 100%)",
        "gradient-green-100-300": "linear-gradient(180deg, #d1faed 0%, #6ee7c1 100%)",
        "gradient-green-100-300-reverse": "linear-gradient(180deg, #6ee7c1 0%, #d1faed 100%)",
        "gradient-green-200-300": "linear-gradient(180deg, #a7f3db 0%, #6ee7c1 100%)",
        "gradient-green-200-300-reverse": "linear-gradient(180deg, #6ee7c1 0%, #a7f3db 100%)",
        "gradient-green-200-400": "linear-gradient(180deg, #a7f3db 0%, #34d3a2 100%)",
        "gradient-green-200-400-reverse": "linear-gradient(180deg, #34d3a2 0%, #a7f3db 100%)",
        "gradient-green-300-400": "linear-gradient(180deg, #6ee7c1 0%, #34d3a2 100%)",
        "gradient-green-300-400-reverse": "linear-gradient(180deg, #34d3a2 0%, #6ee7c1 100%)",

        "gradient-teal-50-100": "linear-gradient(180deg, #f1f9fa 0%, #dceef1 100%)",
        "gradient-teal-50-100-reverse": "linear-gradient(180deg, #dceef1 0%, #f1f9fa 100%)",
        "gradient-teal-50-200": "linear-gradient(180deg, #f1f9fa 0%, #bddfe4 100%)",
        "gradient-teal-50-200-reverse": "linear-gradient(180deg, #bddfe4 0%, #f1f9fa 100%)",
        "gradient-teal-100-200": "linear-gradient(180deg, #dceef1 0%, #bddfe4 100%)",
        "gradient-teal-100-200-reverse": "linear-gradient(180deg, #bddfe4 0%, #dceef1 100%)",
        "gradient-teal-100-300": "linear-gradient(180deg, #dceef1 0%, #90c7d0 100%)",
        "gradient-teal-100-300-reverse": "linear-gradient(180deg, #90c7d0 0%, #dceef1 100%)",
        "gradient-teal-200-300": "linear-gradient(180deg, #bddfe4 0%, #90c7d0 100%)",
        "gradient-teal-200-300-reverse": "linear-gradient(180deg, #90c7d0 0%, #bddfe4 100%)",
      },
      boxShadow: {
        basic: "0 5px 15px -10px rgba(150,170,180,0.5)",
        high: "0 5px 15px -10px rgba(150,170,180,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
