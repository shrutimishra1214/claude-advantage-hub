import type { Config } from "tailwindcss";

// Warm paper, ink and one cobalt accent. The book cover is the only
// multicolour element on the page, so it stays the hero.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#16181F", soft: "#3A3D48", muted: "#6B6E78" },
        paper: { DEFAULT: "#F6F3EE", tint: "#EFEAE1" },
        line: "#E3DDD2",
        accent: { DEFAULT: "#2546D9", soft: "#E8ECFC", deep: "#1B34A6" },
        // Handwritten notes: the colour of a felt-tip pen.
        pen: "#D9541E",
        brand: {
          blue: "#2546D9",
          violet: "#2546D9",
          pink: "#C2416C",
          orange: "#D9541E",
          teal: "#0F8A7E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22,24,31,.04), 0 6px 20px -8px rgba(22,24,31,.10)",
        lift: "0 2px 4px rgba(22,24,31,.04), 0 22px 50px -22px rgba(22,24,31,.28)",
        book: "18px 26px 50px -18px rgba(22,24,31,.45), 0 0 0 1px rgba(22,24,31,.06)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 70s linear infinite",
        "marquee-reverse": "marquee 80s linear infinite reverse",
        "spin-slow": "spin 28s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
