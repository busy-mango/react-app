import { useMemo } from 'react';

import Refresh from '@/icons/refresh.svg';
import { catchMsg } from '@/utils';

import { useFallbackContext } from '../boundary/hooks';
import { useErrorContent } from './hooks';
import type { ErrorBoundaryProps } from './models';
import { QueryBoundary } from './query.boundary';

import styles from './index.scss';

/** Boundary HOC */
export function boundary<P extends object>(
  Component: React.ComponentType<P>,
  boundaryProps: ErrorBoundaryProps = {}
): React.FC<P> {
  const BoundaryComponent: React.FC<P> = (props) => {
    return (
      <QueryBoundary {...boundaryProps}>
        <Component {...props} />
      </QueryBoundary>
    );
  };
  return BoundaryComponent;
}

export const BoundaryFallbackWidget: React.FC = () => {
  const { error, reset } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return (
    <span className={styles.widget}>
      <input readOnly title={msg} value={msg} />
      <Refresh onClick={reset} />
    </span>
  );
};

export const BoundaryFallbackCard: React.FC = () => {
  const { error } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return <div className={styles.card}>{msg}</div>;
};

export const FallbackPage: React.FC = () => (
  <div className={styles.wrapper}>{useErrorContent()}</div>
);

export * from './error.boundary';
export * from './query.boundary';
