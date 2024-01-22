import { LoggedInNavbar } from '~/components/navigation/loggedIn';

import { Container, Grid } from '@mantine/core';
import React from 'react';

type LayoutDashboardProps = {
  children: React.ReactNode;
}
export default function LayoutDashboard({ children }: LayoutDashboardProps) {

  return (
    <Container maw={'100%'} w={'100%'} p={0}>
      <Grid gutter={'sm'}>
        <Grid.Col>
          <LoggedInNavbar />
        </Grid.Col>
        <Grid.Col>
          <main>
            {children}
          </main>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
