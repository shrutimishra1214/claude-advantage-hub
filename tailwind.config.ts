import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

// Cool neutrals, one deep blue, and quiet per-app hues used only as small
// markers. The product previews carry the page, not decoration.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        // Themed per product line through CSS variables (see globals.css).
        ink: { DEFAULT: v("ink"), soft: v("ink-soft"), muted: v("ink-muted") },
        paper: { DEFAULT: v("paper"), tint: v("paper-tint") },
        canvas: v("canvas"),
        line: { DEFAULT: v("line"), strong: v("line-strong") },
        accent: { DEFAULT: v("accent"), soft: v("accent-soft"), deep: v("accent-deep") },
        app: {
          word: "#3767C8",
          excel: "#1E8A5A",
          powerpoint: "#C8551F",
          outlook: "#2C72C7",
          teams: "#5B5FC7",
          onenote: "#7A3FB0",
          copilot: "#0E1726",
        },
        brand: { blue: v("accent"), violet: v("accent"), orange: "#C8551F" },
      },
      fontFamily: {
        display: ["var(--font-heading)", "var(--font-sans)", "system-ui", "sans-serif"],
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
