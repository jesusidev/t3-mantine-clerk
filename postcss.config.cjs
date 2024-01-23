const config = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '64em',
        'mantine-breakpoint-lg': '74em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};

module.exports = config;
