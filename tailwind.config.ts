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
        brand: {
          yellow: "#FFDF40",
          gold: "#B89900",
          black: "#141100",
          cream: "#FFF5C2",
        },
        // Dark redesign palette (homepage 2026)
        night: "#0B0B0D",
        "night-2": "#141416",
        bone: "#F4EFE6",
        gold: {
          DEFAULT: "#FFC927",
          dark: "#E5B41F",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg) scale(1.08)" },
          "50%": { transform: "rotate(6deg) scale(1.12)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 0.6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
