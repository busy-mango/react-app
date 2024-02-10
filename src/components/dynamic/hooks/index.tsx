import { isNil, isNonEmptyString } from '@busymango/is-esm';
import { useQuery } from '@tanstack/react-query';

import { ICON_LOADER_KEY, PAGE_LOADER_KEY } from '@/constants';
import { env } from '@/init';
import { iconAsync, routeAsync } from '@/utils';

import { retry } from '../helpers';

const options = {
  staleTime: Infinity,
  gcTime: Infinity,
  retry,
  retryDelay: 0,
  retryOnMount: true,
  refetchOnMount: false,
  refetchInterval: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
} as const;

export function useLazyIcon(route?: string) {
  const enabled = isNonEmptyString(route);

  const { data: SVGComponent, isFetching } = useQuery({
    ...options,
    queryKey: [ICON_LOADER_KEY, env.version, route],
    queryFn: async () => {
      const chunk = await iconAsync(route!);
      if (!isNil(chunk.default)) return chunk.default;
      throw new Error(`Loading icon ${route} failed`);
    },
    throwOnError: false,
    enabled,
  });

  return { SVGComponent, isFetching };
}

export function useLazyComponent(route?: string) {
  const enabled = isNonEmptyString(route);

  const { data: Component } = useQuery({
    ...options,
    queryKey: [PAGE_LOADER_KEY, env.version, route],
    queryFn: async () => {
      const chunk = await routeAsync(route!);
      if (!isNil(chunk.default)) return chunk.default;
      throw new Error(`Loading chunk ${route} failed`);
    },
    throwOnError: true,
    enabled,
  });

  return { Component };
}
