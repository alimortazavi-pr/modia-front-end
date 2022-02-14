module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-900": "#181820",
      },
      width: {
        17: "4.5rem",
        600: "600px",
      },
      height: {
        17: "4.5rem",
      },
      borderWidth: {
        "1/2": "0.5px",
      },
      spacing: {
        17: '4.4rem',
      }
    },
  },
  plugins: [require("daisyui")],
};
