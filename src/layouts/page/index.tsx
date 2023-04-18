import Head from 'next/head';
import { FooterPrimary } from '~/components/footer';
import { NavigationPrimary } from '~/components/navigation';

type LayoutPageProps = {
  children: string | JSX.Element | (string | JSX.Element | JSX.Element[])[];
}
export default function LayoutPage({ children }: LayoutPageProps) {
  return (
    <>
      <Head>
        <title>CraftCab</title>
        <meta name='description' content='CraftCab' />
        {/*<link rel='icon' href='/favicon.ico' />*/}
      </Head>
      <NavigationPrimary />
      <main>
        {children}
      </main>
      <FooterPrimary />
    </>
  );
}
