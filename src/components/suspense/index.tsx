import type { SuspenseProps } from 'react';
import { Suspense } from 'react';

import { isTrue } from '@busymango/is-esm';

import Loader from '@/icons/loader.svg';
import type { ReactCFC } from '@/models';

export const fallback = <Loader className="animate-spin" />;

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
    return isTrue(isLoading) ? fallback : children;
  },
  { fallback }
);
