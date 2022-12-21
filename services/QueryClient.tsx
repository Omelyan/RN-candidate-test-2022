import { QueryClient } from '@tanstack/react-query';

// cache, online manager, defaults etc. are needed in real life
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
    },
  },
});
