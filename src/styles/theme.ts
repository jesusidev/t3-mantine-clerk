import { color } from '~/styles/colors';
import { type MantineThemeOverride } from '@mantine/core';
import { breakpoints } from '~/styles/breakpoints';
import { button } from '~/styles/button';
import { actionIcon } from '~/styles/actionIcon';

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  dir: 'ltr',
  colors: color,
  primaryColor: 'brand',
  components: {
    Button: button,
    ActionIcon: actionIcon,
  },
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
};
