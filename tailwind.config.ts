import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // エールコネクト ブランドカラー: 温かみのあるオレンジ/レッド
        yell: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        ember: {
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
        },
        warm: {
          bg: "#faf6f2",
          card: "#ffffff",
          border: "#f0e6dd",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "Hiragino Kaku Gothic ProN",
          "Meiryo",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 12px rgba(234, 88, 12, 0.06)",
        soft: "0 1px 3px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "yell-gradient": "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
        "yell-gradient-soft": "linear-gradient(135deg, #ffedd5 0%, #fee2e2 100%)",
      },
      animation: {
        "scale-in": "scaleIn 0.18s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
