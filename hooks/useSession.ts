import { useContext } from 'react';

import { SessionContext } from '~/context';

export function useSession() {
  const session = useContext(SessionContext);

  if (session === undefined) throw new Error('Component must be wrapped in SessionProvider');

  return session;
}
