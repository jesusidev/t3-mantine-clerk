import { SignIn } from '@clerk/nextjs';
import { Anchor, Container, Grid, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import LayoutPage from '~/layouts/page';
import Link from 'next/link';

export default function SignInPage() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <LayoutPage>
      <Container my={40}>
        <Paper withBorder shadow='md' p={20} mt={30} radius='md'>
          <Grid grow>
            <Grid.Col span={6}>
              <Title align={'center'}>Welcome back!</Title>
              <Text color='dimmed' size='sm' align='center' mt={5}>
                Do not have an account yet?{' '}
                <Anchor size='sm' component={Link} href='/sign-up'>
                  Create account
                </Anchor>
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' appearance={{
                layout: {
                  socialButtonsVariant: 'iconButton',
                  socialButtonsPlacement: 'bottom',
                },
                elements: {
                  rootBox: {
                    margin: '0 auto',
                    width: '100%',
                    border: dark ? '1px solid #333' : 'none',
                  },
                  card: {
                    width: '100%',
                    maxWidth: '435px',
                  },
                  footer: {
                    display: 'none',
                  },
                },
              }} />
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </LayoutPage>
  );
}
