import { createStyles, TextInput, type TextInputProps } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  input: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}));

export type InputTextProps = {
  label: string;
  error?: string;
  defaultValue?: string;
}

export function InputText({ label, error, defaultValue, ...props }: InputTextProps & TextInputProps) {
  const { classes } = useStyles();
  return (
    <TextInput
      {...props}
      label={label ? label : ''}
      error={error && error}
      defaultValue={defaultValue ? defaultValue : ''}
      classNames={{ input: error && classes.input }}
      rightSection={error && <IconAlertTriangle stroke={1.5} size='1.1rem' className={classes.icon} />}
    />
  );
}
