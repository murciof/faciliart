const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
  ],
  theme: {
    colors: {
      canvas: '#444444',
    },
    backgroundSize: {
      '400%': '400% 400%',
    },
    extend: {
      fontFamily: {
        chivo: ['Chivo', ...defaultTheme.fontFamily.sans],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      /*
      keyframes: {
        'hero-animation': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '50% 0%' },
        },
      },
      animation: {
        'hero': 'hero-animation 20s ease infinite',
      },
      */
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        faciliart: {
          primary: '#e0e0e0',
          'base-100': '#222222',
          'base-200': '#111111',
          'base-300': '#0f0f0f',
          'base-content': '#e0e0e0',
          neutral: '#555555',
        },
      },
    ],
  },
  safelist: [
    'peer-checked/item_0:btn-primary',
    'peer-checked/item_1:btn-primary',
    'peer-checked/item_2:btn-primary',
    'peer-checked/item_3:btn-primary',
    'peer-checked/item_size_0_0:btn-primary',
    'peer-checked/item_size_0_1:btn-primary',
    'peer-checked/item_size_0_2:btn-primary',
    'peer-checked/item_size_0_3:btn-primary',
    'peer-checked/item_size_1_0:btn-primary',
    'peer-checked/item_size_1_1:btn-primary',
    'peer-checked/item_size_1_2:btn-primary',
    'peer-checked/item_size_1_3:btn-primary',
    'peer-checked/item_size_2_0:btn-primary',
    'peer-checked/item_size_2_1:btn-primary',
    'peer-checked/item_size_2_2:btn-primary',
    'peer-checked/item_size_2_3:btn-primary',
    'peer-checked/item_size_3_0:btn-primary',
    'peer-checked/item_size_3_1:btn-primary',
    'peer-checked/item_size_3_2:btn-primary',
    'peer-checked/item_size_3_3:btn-primary',
  ],
}
