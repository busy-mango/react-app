/**
 * @description ErrorBoundary Context
 */

import { createContext, useMemo } from 'react';

import type { FallbackContextVal } from '../models';

/** Fallback Context */
export const FallbackContext = createContext<FallbackContextVal>(null!);

/** Fallback Provider Component */
export const FallbackProvider: React.FC<
  React.PropsWithChildren<FallbackContextVal>
> = (props) => {
  const { reset, error, isCaught, children } = props;

  return (
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
};
