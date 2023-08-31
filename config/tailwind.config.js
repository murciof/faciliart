const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
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
    themes: false,
  },
  safelist: [
    'peer-checked/line:bg-primary',
    'peer-checked/curve:bg-primary',
    'peer-checked/polygon:bg-primary',
    'peer-checked/item_0:bg-primary',
    'peer-checked/item_1:bg-primary',
    'peer-checked/item_2:bg-primary',
    'peer-checked/item_3:bg-primary',
    'peer-checked/item_size_0_0:bg-primary',
    'peer-checked/item_size_0_1:bg-primary',
    'peer-checked/item_size_0_2:bg-primary',
    'peer-checked/item_size_0_3:bg-primary',
    'peer-checked/item_size_1_0:bg-primary',
    'peer-checked/item_size_1_1:bg-primary',
    'peer-checked/item_size_1_2:bg-primary',
    'peer-checked/item_size_1_3:bg-primary',
    'peer-checked/item_size_2_0:bg-primary',
    'peer-checked/item_size_2_1:bg-primary',
    'peer-checked/item_size_2_2:bg-primary',
    'peer-checked/item_size_2_3:bg-primary',
    'peer-checked/item_size_3_0:bg-primary',
    'peer-checked/item_size_3_1:bg-primary',
    'peer-checked/item_size_3_2:bg-primary',
    'peer-checked/item_size_3_3:bg-primary',
  ],
}
