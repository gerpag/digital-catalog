/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/*.{jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens:{
      xs:"400px",
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
  },
  plugins: [],
};
