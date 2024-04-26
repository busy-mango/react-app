/**
 * @description ErrorBoundary Hooks
 */

import { createContext, useContext, useMemo } from 'react';

import type { ReactCFC } from '@/models';

import type { FallbackContextVal } from '../models';

const FallbackContext = createContext<FallbackContextVal>(null!);

export const FallbackProvider: ReactCFC<FallbackContextVal> = ({
  reset,
  error,
  isCaught,
  children,
}) => (
  <FallbackContext.Provider
    value={useMemo(
      () => ({
        reset,
        error,
        isCaught,
      }),
      [error, reset, isCaught]
    )}
  >
    {children}
  </FallbackContext.Provider>
);

/** Fallback context hooks */
export function useFallbackContext() {
  return useContext(FallbackContext) ?? {};
}
