"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes (garbage collection time)
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

/**
 * Get QueryClient - singleton for browser, new instance for server
 */
const getQueryClient = (() => {
  const clientCache: { current: QueryClient | undefined } = {
    current: undefined,
  };

  return () => {
    if (isServer) {
      // Server: always make a new query client
      return makeQueryClient();
    }

    // Browser: make a new query client if we don't already have one
    if (!clientCache.current) {
      clientCache.current = makeQueryClient();
    }
    return clientCache.current;
  };
})();

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider - Wrap your app with this component
 */
export default function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}

export { getQueryClient };
