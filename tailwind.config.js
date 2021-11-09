module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#38a3a5",
      primaryText: "white",
      error: "red",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
