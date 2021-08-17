import { useAuth, useRouter } from '@hedwig/hooks';

export const Eat = (): JSX.Element => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div>
      <h1>Eat</h1>
      <button onClick={() => auth?.signout().then(() => router.push('/login'))}>
        Logout
      </button>
    </div>
  );
};
