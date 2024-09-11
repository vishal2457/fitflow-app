import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error:any) => {
        if(error?.status === 401 || count === 3) {
          return false
        }
        return true
      },

    },
    
  }
});

export function APIProvider({ children }: { children: React.ReactNode }) {
  useReactQueryDevTools(queryClient);
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}  >{children}</QueryClientProvider>
  );
}
