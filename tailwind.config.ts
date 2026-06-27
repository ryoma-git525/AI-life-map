import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        action: "#33C98F",
      },
      boxShadow: {
        glow: "0 24px 70px rgba(59, 130, 246, 0.16)",
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)",
        action: "0 16px 34px rgba(51, 201, 143, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
