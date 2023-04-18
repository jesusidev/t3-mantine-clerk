import { type MantineTheme } from '@mantine/core';

export const button = {
  variants: {
    filled: (theme: MantineTheme) => ({
      root: {
        backgroundColor: theme.colors.brand && theme.colors.brand[4],
        transition: 'background-color 350ms ease',
        '&:hover': {
          backgroundColor: theme.colors.brand && theme.colors.brand[6],
        },
      },
    }),
  },
} as const;
