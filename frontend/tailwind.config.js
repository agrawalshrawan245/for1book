/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#0275d8",
        'success': "#5cb85c",
        'danger': "#d9534f",
        'warning': "#f0ad4e",
        'info': "#5bc0de",
        'light': "#f7f7f7",
        'dark': "292b2c",
      },
    },
  },
  plugins: [],
}


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }