import { createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import { UserButton as ClerkUserButton, useUser } from '@clerk/nextjs';
import { IconChevronRight } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export function UserButton() {
  const { classes } = useStyles();
  const { user } = useUser();

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <ClerkUserButton />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {user?.fullName}
          </Text>

          <Text color="dimmed" size="xs">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </div>

        <IconChevronRight size="0.9rem" stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}