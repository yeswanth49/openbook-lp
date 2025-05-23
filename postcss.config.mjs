/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Enable autoprefixer for better browser compatibility
    'autoprefixer': {},
    // Tailwind CSS with JIT mode
    'tailwindcss': {},
    // Optional: Add cssnano for production builds to minify CSS
    ...(process.env.NODE_ENV === 'production' ? { 'cssnano': { preset: 'default' } } : {})
  },
};

export default config;
