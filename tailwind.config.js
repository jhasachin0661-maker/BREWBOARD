/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#211A17',
          deep: '#15100E',
          dark: '#1C1613',
          card: '#241D19',
          soft: '#332924',
          muted: '#50433C',
          light: '#6E5D54',
        },
        cream: {
          DEFAULT: '#F4EBDD',
          warm: '#F4EBDD',
          light: '#FAF6EE',
          card: '#FBF8F2',
          border: '#E8DCB8',
          dark: '#E2D1B8',
        },
        coffee: {
          DEFAULT: '#75513D',
          accent: '#75513D',
          rich: '#5D3F2E',
          soft: '#8C634B',
          light: '#AB826B',
        },
        sage: {
          DEFAULT: '#89927A',
          subtle: '#89927A',
          muted: '#6C755E',
          soft: '#A2AA94',
          light: '#EDF1E8',
        },
        orange: {
          burnt: '#C47B4D',
          vivid: '#D97736',
          soft: '#E08F5D',
          tint: '#F9EFEB',
        },
        gold: {
          DEFAULT: '#C99D53',
          light: '#DFB976',
          dark: '#9F752B',
          glow: 'rgba(201, 157, 83, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(33, 26, 23, 0.05), 0 2px 6px -1px rgba(33, 26, 23, 0.03)',
        'warm-hover': '0 16px 36px -4px rgba(33, 26, 23, 0.12), 0 6px 14px -2px rgba(33, 26, 23, 0.06)',
        'warm-card': '0 2px 12px rgba(33, 26, 23, 0.04)',
        'luxury': '0 20px 48px -10px rgba(21, 16, 14, 0.2), 0 8px 18px -4px rgba(21, 16, 14, 0.08)',
        'gold-glow': '0 0 25px rgba(201, 157, 83, 0.35)',
      }
    },
  },
  plugins: [],
};
