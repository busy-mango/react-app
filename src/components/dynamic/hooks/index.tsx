import { useEffect } from 'react';

import {
  isFalse,
  isNil,
  isNonEmptyString,
  isString,
  isTrue,
} from '@busymango/is-esm';
import { S2MS } from '@busymango/utils';
import type { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { ICON_LOADER_KEY, PAGE_LOADER_KEY, SNIFFER_KEY } from '@/constants';
import { env } from '@/init';
import type { ReactComponentType } from '@/models';
import { iconAsync, isNotFoundError, routeAsync } from '@/utils';

import { reset, update } from '../helpers';

type ComponentChunk = ReactComponentType | null;

const options: Partial<UndefinedInitialDataOptions> = {
  retryDelay: 0,
  retryOnMount: false,
  refetchOnMount: false,
  refetchInterval: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
  staleTime: Infinity,
  gcTime: Infinity,
  retry: (count: number, error: unknown) =>
    isFalse(isNotFoundError(error)) && count < 2,
};

export function useLazyIcon(route?: string) {
  const enabled = isNonEmptyString(route);

  const { data, isFetching } = useQuery({
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

  const SVGComponent = (data as ComponentChunk) ?? undefined;

  return { SVGComponent, isFetching };
}

/**
 * Suspense
 */
export function useSuspenseIsLatest() {
  const { data: isLatest } = useSuspenseQuery({
    queryKey: [SNIFFER_KEY, env.version],
    queryFn: async () => {
      const headers = { ['Cache-Control']: 'no-cache' };
      const src = `/static/${env.version}/manifest.js`;
      const res = await fetch(src, { headers });
      return res.status === 200;
    },
    gcTime: 5 * S2MS,
    staleTime: 5 * S2MS,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: 'always',
  });

  useEffect(() => {
    isTrue(isLatest) && reset();
    isFalse(isLatest) && update();
  }, [isLatest]);

  return isLatest;
}

export function useLazyComponent(route?: string, func = routeAsync) {
  const isLatest = useSuspenseIsLatest();

  const { data, isFetching } = useSuspenseQuery({
    ...options,
    queryKey: [PAGE_LOADER_KEY, route, isLatest],
    queryFn: async () => {
      if (isLatest && isString(route)) {
        const chunk = await func(route);
        if (!isNil(chunk.default)) return chunk.default;
        throw new Error(`Loading chunk ${route} failed`);
      }
      return null;
    },
  });

  const Component = (data as ComponentChunk) ?? undefined;

  return { Component, isFetching };
}
