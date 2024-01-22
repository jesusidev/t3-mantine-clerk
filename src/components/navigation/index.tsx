import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  rem,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconMoonStars,
  IconNotification,
  IconSun,
} from '@tabler/icons-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import classes from './styles/Navigation.module.css';
import { color } from '~/styles/colors';


const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function NavigationPrimary() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group align='flex-start'>
        <ThemeIcon size={34} variant='default' radius='md'>
          <item.icon size={rem(22)} />
        </ThemeIcon>
        <div>
          <Text size='sm' fw={500}>
            {item.title}
          </Text>
          <Text size='xs' >
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <div>
      <Group>

        <Group className={classes.hiddenMobile}>
          <Text component={Link} href='/' className={classes.link}>
            Home
          </Text>
          <HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
            <HoverCard.Target>
              <a href='#' className={classes.link}>
                <Center inline>
                  <Box component='span' mr={5}>
                    Features
                  </Box>
                  <IconChevronDown size={16} />
                </Center>
              </a>
            </HoverCard.Target>

            <HoverCard.Dropdown>
              <Group px='md'>
                <Text fw={500}>Features</Text>
                <Anchor href='#' fz='xs'>
                  View all
                </Anchor>
              </Group>

              <Divider
                my='sm'
                mx='-md'
                color={color.purple[5]}
              />

              <SimpleGrid cols={2} spacing={0}>
                {links}
              </SimpleGrid>

              <div className={classes.dropdownFooter}>
                <Group>
                  <div>
                    <Text fw={500} fz='sm'>
                      Get started
                    </Text>
                    <Text size='xs'>
                      Their food sources have decreased, and their numbers
                    </Text>
                  </div>
                  <Button variant='default'>Get started</Button>
                </Group>
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
          <a href='#' className={classes.link}>
            Learn
          </a>
          <a href='#' className={classes.link}>
            Academy
          </a>
        </Group>

        <Group className={classes.hiddenMobile}>
          <Button component='a' href='/sign-in' variant='default'>Sign in</Button>
          <Button component='a' href='/sign-up'>Sign up</Button>
          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'
          >
            {dark ? <IconSun size='1.1rem' /> : <IconMoonStars size='1.1rem' />}
          </ActionIcon>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
      </Group>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        className={classes.hiddenDesktop}
        zIndex={100}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx='-md'>
          <Divider my='sm' color={color.red[0]} />

          <Text component={Link} href='/' className={classes.link}>
            Home
          </Text>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component='span' mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href='#' className={classes.link}>
            Learn
          </a>
          <a href='#' className={classes.link}>
            Academy
          </a>
          <SignedIn>
            <Box ml={15}>
              <UserButton />
            </Box>
          </SignedIn>

          <Divider my='sm' />

          <Group grow pb='xl' px='md'>
            <Button component='a' href='/sign-in' variant='default'>Sign in</Button>
            <Button component='a' href='/sign-up'>Sign up</Button>
            <ActionIcon
              variant='outline'
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title='Toggle color scheme'
            >
              {dark ? <IconSun size='1.1rem' /> : <IconMoonStars size='1.1rem' />}
            </ActionIcon>
          </Group>
        </ScrollArea>
      </Drawer>
    </div>
  );
}
