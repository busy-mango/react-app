import type { SuspenseProps } from 'react';
import { Suspense } from 'react';

import { isTrue } from '@busymango/is-esm';

import type { ReactCFC } from '@/models';

import { SuspenseFallbackModule, SuspenseFallbackWidget } from './widgets';

/** Suspense HOC */
export function suspense<P extends object>(
  Component: React.ComponentType<P>,
  suspenseProps: SuspenseProps = {}
) {
  const SuspenseComponent: React.FC<P> = (props) => {
    return (
      <Suspense {...suspenseProps}>
        <Component {...props} />
      </Suspense>
    );
  };
  return SuspenseComponent;
}

export const SuspenseWidget: ReactCFC<{
  isLoading?: boolean;
}> = suspense(
  (props) => {
    const { children, isLoading = false } = props;
    return isTrue(isLoading) ? <SuspenseFallbackWidget /> : children;
  },
  { fallback: <SuspenseFallbackWidget /> }
);

export const SuspenseModule: ReactCFC<{
  isLoading?: boolean;
}> = suspense(
  (props) => {
    const { children, isLoading = false } = props;
    return isTrue(isLoading) ? <SuspenseFallbackModule /> : children;
  },
  { fallback: <SuspenseFallbackModule /> }
);

export * from './widgets';
