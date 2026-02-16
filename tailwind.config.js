/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1b1a1f",
        night: "#0f0f14",
        sand: "#f6f0eb",
        blush: "#f3c8c2",
        rose: "#e89aa9",
        sage: "#9bb7b2",
        sun: "#f6d7a7",
        accent: "#e36b6b",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
        glow: "0 0 40px rgba(227,107,107,0.25)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at 10% 20%, #f3c8c2 0%, transparent 55%), radial-gradient(circle at 80% 10%, #f6d7a7 0%, transparent 45%), linear-gradient(135deg, #f6f0eb 0%, #f1e4df 100%)",
      },
    },
  },
  plugins: [],
};
