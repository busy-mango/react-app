/**
 * @description react app configuration
 */

import { useEffect } from 'react';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  QueryBoundary,
  ReactQueryDevtools,
  SuspenseModule,
} from '@/components';
import { useAppAction, useMemoFunc } from '@/hooks';
import type { ReactCFC } from '@/models';
import { catchMsg } from '@/utils';

export const client = new QueryClient({
  queryCache: new QueryCache({}),
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: Infinity,
      throwOnError: true,
      retryOnMount: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: (count: number, error: unknown) => {
        console.warn(catchMsg(error));
        return count <= 2;
      },
    },
    mutations: {
      onError: (error: unknown) => {
        const content = catchMsg(error);
        console.error(content);
      },
    },
  },
});

/** APP config provider */
export const Configure: ReactCFC = (props) => {
  const { children } = props;

  const set = useAppAction();

  const listener = useMemoFunc(() => {
    set({ display: document.visibilityState });
  });

  useEffect(() => {
    const type = 'visibilitychange';
    document.addEventListener(type, listener);
    return () => {
      document.removeEventListener(type, listener);
    };
  }, [listener]);

  return (
    <QueryClientProvider client={client}>
      <QueryBoundary>
        <SuspenseModule>{children}</SuspenseModule>
      </QueryBoundary>
      {ReactQueryDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
