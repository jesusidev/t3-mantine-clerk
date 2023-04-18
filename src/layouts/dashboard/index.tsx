import { LoggedInNavbar } from '~/components/navigation/loggedIn';

import { Container, Grid } from '@mantine/core';

type LayoutDashboardProps = {
  children: string | JSX.Element | (string | JSX.Element | JSX.Element[])[];
}
export default function LayoutDashboard({ children }: LayoutDashboardProps) {

  return (
    <Container maw={'100%'} w={'100%'} p={0}>
      <Grid gutter={'sm'}>
        <Grid.Col xs={12} lg={3} xl={'auto'}>
          <LoggedInNavbar />
        </Grid.Col>
        <Grid.Col xs={12} lg={9} xl={10}>
          <main>
            {children}
          </main>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
