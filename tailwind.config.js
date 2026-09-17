/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F1A501',
          hover: '#df9800',
        },
        secondary: {
          DEFAULT: '#5E6282',
        },
        danger: {
          DEFAULT: '#DF6951',
          hover: '#d15b43',
        },
        dark: {
          DEFAULT: '#181E4B',
          navy: '#212832',
        },
        info: '#006380',
        success: '#79B93C',
      },
      fontFamily: {
        sans: ['Poppins', 'Rubik', 'sans-serif'],
        cursive: ['Volkhov', 'serif'],
      },
      boxShadow: {
        'primary-btn': '0px 20px 35px rgba(241, 165, 1, 0.25)',
        'danger-btn': '0px 15px 30px rgba(223, 105, 81, 0.3)',
        'card': '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.015), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.012), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.007)',
        'hover-card': '0px 20px 40px rgba(0, 0, 0, 0.08)',
        'social': '0px 2px 10px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'large-cta': '129px 20px 20px 20px',
      }
    },
  },
  plugins: [],
}
