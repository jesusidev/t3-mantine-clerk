import NextApp, { type AppContext, type AppProps } from 'next/app';
import Head from 'next/head';
import { type ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { api } from '~/utils/api';
import { ClerkProvider } from '@clerk/nextjs';
import { theme } from '~/styles/theme';
import '@fontsource/work-sans';
import '@fontsource/roboto';
import { useState } from 'react';
import { dark } from '@clerk/themes';
import { getCookie, setCookie } from 'cookies-next';
import { useHotkeys } from '@mantine/hooks';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const [colorSchemeState, setColorSchemeState] = useState<ColorScheme>(pageProps.colorScheme === 'dark' ? 'dark' : 'light');
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorSchemeState === 'dark' ? 'light' : 'dark');
    setColorSchemeState(nextColorScheme);
    setCookie('color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  //Ctrl/⌘ + J
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <>
      <Head>
        <title>T3 Mantine ClerkAuth | Inventory App</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        {/*<link rel='shortcut icon' href='/favicon.svg' />*/}
      </Head>

      <div dir='ltr' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ColorSchemeProvider colorScheme={colorSchemeState} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ ...theme, colorScheme: colorSchemeState }}
            withGlobalStyles
            withNormalizeCSS
          >
            <ClerkProvider {...pageProps} appearance={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              baseTheme: colorSchemeState === 'dark' ? dark : colorSchemeState,
            }}>
              <Notifications position='top-right' zIndex={2077} limit={5} />
              <Component {...pageProps} />
            </ClerkProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
    </>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    pageProps: {
      colorScheme: getCookie('color-scheme', appContext.ctx) || 'light',
    },
  };
};

export default api.withTRPC(App);
