/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2B6CB0',
        secondary: '#4A5568',
        accent: '#38A169',
        background: '#F7FAFC',
        card: '#FFFFFF',
        text: '#2D3748',
      },
    },
  },
  plugins: [],
};

