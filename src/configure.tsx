/**
 * @description react app configuration
 */

import { lazy, Suspense, useEffect } from 'react';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { useAppAction } from './hooks/app';
import { useMemoFunc } from './hooks/memo.func';
import { QueryBoundary } from './components';
import { AppEnv, env } from './init';
import type { ReactCFC } from './models';
import { catchMsg } from './utils';

const ReactQueryDevtools =
  env.name !== AppEnv.Prod &&
  lazy(async () => ({
    default: (await import('@tanstack/react-query-devtools'))
      .ReactQueryDevtools,
  }));

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
    <QueryBoundary>
      <Suspense>
        <QueryClientProvider client={client}>
          {children}
          {ReactQueryDevtools && <ReactQueryDevtools />}
        </QueryClientProvider>
      </Suspense>
    </QueryBoundary>
  );
};
