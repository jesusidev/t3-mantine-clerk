// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  ActionIcon,
  Badge,
  Burger,
  Code,
  createStyles,
  Grid,
  Group,
  Header,
  Navbar,
  rem,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconBulb,
  IconCheckbox,
  IconLayoutDashboard,
  IconMoonStars,
  IconPlus,
  IconSearch,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { UserButton } from '~/components/userButton';
import ModalCreateProject from '~/components/modal/CreateProject';
import { useDisclosure } from '@mantine/hooks';
import { api } from '~/utils/api';
import { useState } from 'react';

const useStyles = createStyles((theme, { openMobile = false }) => ({
  navbar: {
    paddingTop: 0,
    border: 'none',
    display: openMobile ? 'flex' : 'none',
    height: openMobile ? '100vh' : 'auto',
    animation: openMobile ? 'slideIn 0.3s ease-in-out' : 'slideOut 0.3s ease-in-out',
    [theme.fn.largerThan('lg')]: {
      display: 'flex',
      borderRight: '0.0625rem solid #e9ecef',
      animation: 'none',
    },
    '@keyframes slideIn': {
      '0%': {
        transform: 'translateX(-100%)',
      },
      '100%': {
        transform: 'translateX(0)',
      },
    },
    '@keyframes slideOut': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-100%)',
      },
    },
  },

  header: {
    display: 'block',
    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: 'block',
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconLayoutDashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: IconBulb, label: 'Activity', notifications: 3, link: '/activity' },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4, link: '/tasks' },
  { icon: IconUser, label: 'Contacts', link: '/contacts' },
];

export function LoggedInNavbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const { classes } = useStyles({ openMobile });
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const onCreateProjectClick = () => {
    open();
  };

  const { data: projects } = api.project.getAll.useQuery();

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink} component={'a'} href={link.link}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size='sm' variant='filled' className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const projectLinks = projects?.map((project) => (
    <Link
      href={`/projects/${project.id}`}
      key={project.id}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>💸</span>
      {project.name}
    </Link>
  ));

  return (
    <>
      {opened && <ModalCreateProject opened={opened} close={close} />}
      <Header height={60} px='md' className={classes.header}>
        <Group position='apart' sx={{ height: '100%' }}>
          <Burger color='teal' opened={openMobile} onClick={() => setOpenMobile(!openMobile)} />
        </Group>
      </Header>
      <Navbar height={700} maw={{ sm: 'auto', lg: 300 }} p='md' className={classes.navbar}>
        <Navbar.Section className={classes.section}>
          <Grid>
            <Grid.Col span={1}>
              <ActionIcon
                variant='outline'
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title='Toggle color scheme'
              >
                {dark ? <IconSun size='1.1rem' /> : <IconMoonStars size='1.1rem' />}
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={11}>
              <UserButton />
            </Grid.Col>
          </Grid>
        </Navbar.Section>

        <TextInput
          placeholder='Search'
          size='xs'
          icon={<IconSearch size='0.8rem' stroke={1.5} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          mb='sm'
        />

        <Navbar.Section className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.section}>
          <Group className={classes.collectionsHeader} position='apart'>
            <Text size='xs' weight={500} color='dimmed'>
              Projects
            </Text>
            <Tooltip label='Create Project' withArrow position='right'>
              <ActionIcon variant='default' size={18} onClick={onCreateProjectClick}>
                <IconPlus size='0.8rem' stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div className={classes.collections}>{projectLinks}</div>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
