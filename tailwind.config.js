module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      tableLayout: ['hover', 'focus'],
      backgroundColor: theme => ({
        ...theme('colors'),
        'main': '#3F51B5',
        'input': '#F5F5F5',
        'disable': '#B6BEC9',
        'dark': '#242424',
        'theme-red': '#E03F3F',
      }),

      textColor: theme => ({
        ...theme('colors'),
        'main': '#3F51B5',
        'input': '#F5F5F5',
        'disable': '#B6BEC9',
        'dark': '#242424',
        'theme-red': '#E03F3F',
      }),

      borderColor: theme => ({
        ...theme('colors'),
        'main': '#3F51B5',
        'input': '#BCBCBC55',
        'disable': '#B6BEC9',
        'dark': '#242424',
        'theme-red': '#E03F3F',
      }),

      borderRadius: {
        '20px': '20px',
        'footer': '25px 25px 0 0'
      },

      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        'card': '0 3px 6px #00000025',
        'footer': '1px 1px 5px 0px #ccc'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}