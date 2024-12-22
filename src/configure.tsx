/**
 * @description react app configuration
 */

import { S2MS } from '@busymango/utils';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import type { ReactCFC } from '@/models';
import { catchMsg } from '@/utils';

export const client = new QueryClient({
  queryCache: new QueryCache({}),
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: 5 * S2MS,
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

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
