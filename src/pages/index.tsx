import { Hero } from '~/components/hero';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import LayoutPage from '~/layouts/page';

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    void router.push('/dashboard');
  }

  return (
    <LayoutPage>
      <Hero />
    </LayoutPage>
  );
}

