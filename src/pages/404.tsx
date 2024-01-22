import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import LayoutDashboard from '~/layouts/dashboard';
import classes from './Error404.module.css';

// const useStyles = createStyles((theme) => ({
//   root: {
//     paddingTop: rem(80),
//     paddingBottom: rem(80),
//   },
//
//   title: {
//     fontWeight: 900,
//     fontSize: rem(34),
//     marginBottom: theme.spacing.md,
//
//     [theme.fn.smallerThan('sm')]: {
//       fontSize: rem(32),
//     },
//   },
//
//   control: {
//     [theme.fn.smallerThan('sm')]: {
//       width: '100%',
//     },
//   },
//
//   mobileImage: {
//     [theme.fn.largerThan('sm')]: {
//       display: 'none',
//     },
//   },
//
//   desktopImage: {
//     [theme.fn.smallerThan('sm')]: {
//       display: 'none',
//     },
//   },
// }));

export default function NotFoundPage() {

  return (
    <LayoutDashboard>
      <Container className={classes.root}>
        <SimpleGrid spacing={80} cols={2}>
          <Image src='https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg' className={classes.mobileImage}
                 alt={'404 Page Not Found'} />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text size='lg'>
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Button component={'a'} href={'/'} variant='outline' size='md' mt='xl' className={classes.control}>
              Get back to home page
            </Button>
          </div>
          <Image src='https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg' className={classes.desktopImage}
                 alt={'404 Page Not Found'} />
        </SimpleGrid>
      </Container>
    </LayoutDashboard>
  );
}
