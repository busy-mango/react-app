/**
 * @author 徐子梁
 * @description error boundary
 */

import { ErrorBoundaryProps } from './models';
import { QueryBoundary } from './query.boundary';

/** HOC */
export function boundary<P extends object>(
  Component: React.ComponentType<P>,
  boundaryProps: ErrorBoundaryProps,
): React.FC<P> {
  const BoundaryComponent: React.FC<P> = (componentProps) => {
    return (
      <QueryBoundary {...boundaryProps}>
        <Component {...componentProps} />
      </QueryBoundary>
    );
  };
  return BoundaryComponent;
}

export * from './error.boundary';
export * from './query.boundary';
