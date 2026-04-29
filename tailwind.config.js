/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigators/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E0F12",
          soft: "#2A2C33",
          muted: "#6B6F78",
        },
        canvas: {
          DEFAULT: "#F6F1E7",
          card: "rgba(255,255,255,0.55)",
          border: "rgba(14,15,18,0.08)",
        },
        ember: {
          DEFAULT: "#D55A2B",
          deep: "#A53C12",
          soft: "#F1B58F",
        },
        condition: {
          dawn: "#F6B26B",
          dusk: "#7E5BEF",
          rain: "#5C7C99",
          night: "#0B1730",
          mist: "#B8BFC8",
        },
      },
      fontFamily: {
        display: ["System"],
        body: ["System"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        looser: "0.18em",
      },
    },
  },
  plugins: [],
};
