import { color, Colors } from '~/styles/colors';
import { createTheme, type MantineThemeOverride } from '@mantine/core';
import { breakpoints } from '~/styles/breakpoints';

export const theme: MantineThemeOverride = createTheme({
  colors: color as Colors,
  primaryColor: color.brand[6],
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
