/**
 * @description react app configuration
 */

import { Suspense, useEffect } from 'react';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { useAppAction } from './hooks/app';
import { useMemoFunc } from './hooks/memo.func';
import { QueryBoundary } from './components';
import type { ReactComponentFC } from './models';
import { catchMsg } from './utils';

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
export const Configure: ReactComponentFC = (props) => {
  const { children } = props;

  const { set } = useAppAction();

  const listener = useMemoFunc(() => {
    set({ isDocumentVisible: document.visibilityState === 'visible' });
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
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </Suspense>
    </QueryBoundary>
  );
};
