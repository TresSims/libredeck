/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./indec.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1a1b26",
        gutter: "#414868",
        subdued: "#565f89",
        foreground: "#a9b1d6",
        magenta: "#bb9af7",
        blue: "#7aa2f7",
        cyan: "#77ddcc",
        green: "#73daca",
        yellow: "#e0af68",
        red: "#f7768e",
        storm: "#24283b",
        black: "#000",
        white: "#fff",
      },
    },
  },
  plugins: [],
};
