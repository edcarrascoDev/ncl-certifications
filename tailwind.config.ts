import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "picton-blue": {
          "50": "#f1f9fe",
          "100": "#e2f2fc",
          "200": "#bee5f9",
          "300": "#85d0f4",
          "400": "#45b9eb",
          "500": "#29aae3",
          "600": "#0f81ba",
          "700": "#0e6796",
          "800": "#0f567d",
          "900": "#134867",
          "950": "#0c2e45",
        },
        primary: "#0c2e45",
        secondary: "#29aae3",
        light: "#f1f1f1",
        error: "#d22f30",
      },
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
