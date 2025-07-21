// tailwind.config.js

module.exports = {
  content: [
    "./*.html",        // all HTML files in root
    "./html/**/*.html", // all HTML files in html/ subfolders
    "./js/**/*.js"      // all JS files in js/ subfolders
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e63946',
          dark: '#a4161a',
          light: '#ff6b6b'
        },
        secondary: {
          DEFAULT: '#f1faee',
          dark: '#d8e2dc'
        },
        accent: {
          DEFAULT: '#457b9d',
          dark: '#1d3557'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      }
    }
  },
  plugins: []
};
