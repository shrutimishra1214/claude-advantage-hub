import type { Config } from "tailwindcss";

// Cool neutrals, one deep blue, and quiet per-app hues used only as small
// markers. The product previews carry the page, not decoration.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#0E1726", soft: "#344054", muted: "#5B6577" },
        paper: { DEFAULT: "#F6F7F9", tint: "#EEF1F5" },
        line: { DEFAULT: "#E3E7ED", strong: "#CDD3DC" },
        accent: { DEFAULT: "#2251CC", soft: "#EAF0FD", deep: "#173B99" },
        app: {
          word: "#3767C8",
          excel: "#1E8A5A",
          powerpoint: "#C8551F",
          outlook: "#2C72C7",
          teams: "#5B5FC7",
          onenote: "#7A3FB0",
          copilot: "#0E1726",
        },
        brand: { blue: "#2251CC", violet: "#2251CC", orange: "#C8551F" },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,23,38,.04), 0 4px 14px -6px rgba(14,23,38,.08)",
        lift: "0 1px 2px rgba(14,23,38,.04), 0 18px 40px -20px rgba(14,23,38,.22)",
        window: "0 1px 0 rgba(14,23,38,.04), 0 30px 70px -30px rgba(14,23,38,.35)",
        book: "14px 20px 40px -16px rgba(14,23,38,.40), 0 0 0 1px rgba(14,23,38,.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
