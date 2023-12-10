/**
 * @author 徐子梁
 * @description react app configuration
 */

import { Suspense } from 'react';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
  return (
    <QueryBoundary>
      <Suspense>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </Suspense>
    </QueryBoundary>
  );
};
