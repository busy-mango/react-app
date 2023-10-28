/**
 * @author 徐子梁
 * @description router hooks
 */

import { useContext } from 'react';

import { SuspenseContext } from '@routers/context';
import { ComponentType, DynamicImportFunc, SuspenseContextVal } from '@routers/models';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { env } from '@/~init';
import { isNonEmptyString } from '@busymango/is-esm';
import { isNotFoundPage } from '@/service/errors';
import { PAGE_LOADER_KEY } from '@/constants';

/** Webpack dynamic import */
const factory: DynamicImportFunc = (path) => {
  return import(`../../pages${path}`);
};

/**
 * React Query Retry
 * 如果是404则不会进行重试
 * 重试次数不超过3次
 */
const retry = (count: number, error: unknown) => {
  if (isNotFoundPage(error)) return false;
  return count < 2;
};

function useSuspenseContext(): SuspenseContextVal | undefined {
  return useContext(SuspenseContext);
}

export function useContextLoadable() {
  return useSuspenseContext()?.isLoadable;
}

export function useContextComplete() {
  return useSuspenseContext()?.isComplete;
}

export function useLoadableDispatch() {
  return useSuspenseContext()?.setLoadable;
}

export function useCompleteDispatch() {
  return useSuspenseContext()?.setComplete;
}

export function useLazyComponent(route?: string) {
  const setComplete = useCompleteDispatch();
  const setLoadable = useLoadableDispatch();

  if (!isNonEmptyString(route)) {
    throw new Error('route is undefined');
  }

  return useQuery<ComponentType | null>({
    queryKey: [
      PAGE_LOADER_KEY,
      env.version,
      route,
    ],
    queryFn: async () => {
      setLoadable?.(true);
      setComplete?.(false);

      await new Promise(res => {
        setTimeout(() => {
          res(null)
        }, 10000)
      })

      const res = await factory(route);

      setComplete?.(true);
      return res.default;
    },
    retry,
    retryDelay: 0,
    retryOnMount: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    throwOnError: true,
    gcTime: Infinity,
  });
}
