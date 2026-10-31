import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1030", soft: "#2A2F52", muted: "#5B6083" },
        paper: { DEFAULT: "#FBFAFF", tint: "#F3F1FF" },
        brand: {
          blue: "#2F6BFF",
          violet: "#7C3AED",
          pink: "#EC4899",
          orange: "#F97316",
          teal: "#14B8A6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        spectrum: "linear-gradient(100deg,#2F6BFF 0%,#7C3AED 35%,#EC4899 68%,#F97316 100%)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,16,48,.04), 0 8px 24px -8px rgba(11,16,48,.12)",
        lift: "0 2px 4px rgba(11,16,48,.04), 0 24px 60px -20px rgba(47,107,255,.35)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 60s linear infinite",
        "marquee-reverse": "marquee 70s linear infinite reverse",
      },
    },
  },
  plugins: [],
} satisfies Config;
