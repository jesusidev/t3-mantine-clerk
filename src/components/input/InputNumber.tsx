import { useRef } from 'react';
import { ActionIcon, createStyles, NumberInput, type NumberInputHandlers, rem } from '@mantine/core';
import { IconAlertTriangle, IconMinus, IconPlus } from '@tabler/icons-react';

const useStyles = createStyles((theme, { error = '' }: InputNumberProps) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${rem(6)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,

    '&:focus-within': {
      borderColor: theme.colors.blue[6],
    },
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
    }`,

    '&:disabled': {
      borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: 'transparent',
    },
  },

  input: {
    textAlign: 'center',
    paddingRight: `${theme.spacing.sm} !important`,
    paddingLeft: `${theme.spacing.sm} !important`,
    height: rem(28),
    flex: 1,
    backgroundColor: error ? theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0] : 'transparent',
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },

}));

type InputNumberProps = {
  min?: number;
  max?: number;
  label?: string;
  error?: string;
  defaultValue?: number;
}

export function InputNumber({ min = 0, max, label, error, defaultValue, ...props }: InputNumberProps) {
  const { classes } = useStyles({ error });
  const handlers = useRef<NumberInputHandlers>(null);

  return (
    <div className={classes.wrapper}>
      <ActionIcon<'button'>
        size={28}
        variant='transparent'
        onClick={() => handlers.current?.decrement()}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconMinus size='1rem' stroke={1.5} />
      </ActionIcon>

      <NumberInput
        {...props}
        variant='unstyled'
        min={min}
        max={max}
        label={label ? label : ''}
        error={error && error}
        defaultValue={defaultValue ? defaultValue : 0}
        handlersRef={handlers}
        classNames={{ input: classes.input }}
        rightSection={error && <IconAlertTriangle stroke={1.5} size='1.1rem' className={classes.icon} />}
      />

      <ActionIcon<'button'>
        size={28}
        variant='transparent'
        onClick={() => handlers.current?.increment()}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconPlus size='1rem' stroke={1.5} />
      </ActionIcon>
    </div>
  );
}
