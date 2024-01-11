import type { SuspenseProps } from 'react';
import { Suspense } from 'react';

import Loader from '@/icons/loader.svg';
import type { ReactComponentFC } from '@/models';
import { isTrue } from '@busymango/is-esm';

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

export const SuspenseWidget: ReactComponentFC<{
  isLoading?: boolean;
}> = suspense(
  (props) => {
    const { children, isLoading = false } = props;
    return isTrue(isLoading) ? fallback : children;
  },
  { fallback }
);
