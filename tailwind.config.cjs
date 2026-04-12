/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#08110c',
        steel: '#102117',
        charcoal: '#1f2937',
        accent: '#16a34a',
        ink: '#ecfdf5',
        mist: '#94a3b8',
        pine: '#166534'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(22,163,74,0.25), 0 24px 60px rgba(2,6,23,0.45)'
      },
      backgroundImage: {
        rugged: 'linear-gradient(135deg, rgba(8,17,12,0.98), rgba(15,23,42,0.92))',
        aurora: 'radial-gradient(circle at top left, rgba(22,163,74,0.28), transparent 30%), radial-gradient(circle at top right, rgba(15,118,110,0.18), transparent 24%)'
      }
    }
  },
  plugins: []
};
