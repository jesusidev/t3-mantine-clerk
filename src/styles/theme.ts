import { color } from '~/styles/colors';
import { createTheme } from '@mantine/core';
import { breakpoints } from '~/styles/breakpoints';

export const theme = createTheme({
  colors: color,
  fontFamily: '\'Work Sans\', sans-serif',
  headings: {
    fontFamily: '\'Roboto\', sans-serif',
  },
  breakpoints: {
    xs: breakpoints.mobile,
    sm: breakpoints.mobile,
    md: breakpoints.tablet,
    lg: breakpoints.laptop,
    xl: breakpoints.desktop,
  },
});
