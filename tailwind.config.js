/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/page/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          base: '#3b82f6',
          dark: '#1d4ed8',
        },
        secondary: {
          light: '#9ca3af',
          base: '#6b7280',
          dark: '#374151',
        },
        info: {
          light: '#22d3ee',
          base: '#06b6d4',
          dark: '#0e7490',
        },
        success: {
          light: '#4ade80',
          base: '#22c55e',
          dark: '#15803d',
        },
        warning: {
          light: '#fb923c',
          base: '#f97316',
          dark: '#c2410c',
        },
        danger: {
          light: '#f87171',
          base: '#ef4444',
          dark: '#b91c1c',
        },
      },
      variants: {
        lineClamp: ['hover'],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
