import { MantineTheme } from '@mantine/core';

export const actionIcon = {
  variants: {
    heart: (theme: MantineTheme) => ({
      root: {
        backgroundColor: theme.fn.rgba(theme.colors.red[6], 0.1),
        transition: 'background-color 350ms ease',
        'svg': {
          color: theme.colors.red[6],
          fill: 'white',
          transition: 'fill 350ms ease',
        },
        '&:hover': {
          backgroundColor: theme.fn.rgba(theme.colors.red[6], 0.3),
        },
        '&:hover svg': {
          fill: theme.colors.red[6],
          animation: 'pulse 1s infinite',
        },
        '@keyframes pulse': {
          '0%': {
            transform: 'scale(.75)',
          },
          '20%': {
            transform: 'scale(1)',
          },
          '40%': {
            transform: 'scale(.75)',
          },
          '60%': {
            transform: 'scale(1)',
          },
          '80%': {
            transform: 'scale(.75)',
          },
          '100%': {
            transform: 'scale(.75)',
          },
        },
      },
    }),
  },
} as const;
