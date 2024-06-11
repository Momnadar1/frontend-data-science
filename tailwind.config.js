/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "chackra-bold": ["ChakraPetch-bold", "sans-serif"],
        "chackra-bold-italic": ["ChakraPetch-bold-italic", "sans-serif"],
        "chackra-italic": ["ChakraPetch-italic", "sans-serif"],
        "chackra-light": ["ChakraPetch-light", "sans-serif"],
        "chackra-light-italic": ["ChakraPetch-light-italic", "sans-serif"],
        "chackra-medium": ["ChakraPetch-medium", "sans-serif"],
        "chackra-medium-italic": ["ChakraPetch-medium-italic", "sans-serif"],
        "chackra-regular": ["ChakraPetch-regular", "sans-serif"],
        "chackra-semibold": ["ChakraPetch-semibold", "sans-serif"],
        "chackra-semibold-italic": ["ChakraPetch-semibold-italic", "sans-serif"],
        "protest-regular": ["ProtestStrike-regular", "sans-serif"],
        "type-machine": ["Type-machine", "sans-serif"],
      },     
    },
  },
  plugins: [],
}
