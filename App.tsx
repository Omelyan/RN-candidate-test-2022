import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import Navigation from '~/navigation';
import { SessionProvider } from '~/context';
import { useCachedResources } from '~/hooks';
import { queryClient } from './services';

export default function App() {
  const { isLoading, initialSessionData } = useCachedResources();

  if (isLoading) return null;

  return (
    <SafeAreaProvider>
      <SessionProvider initialSessionData={initialSessionData.current}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
