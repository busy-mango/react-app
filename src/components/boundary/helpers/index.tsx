import type { ErrorBoundaryProps } from '../models';
import { QueryBoundary } from '../widgets';

/** Boundary HOC */
export function boundary<P extends object>(
  Component: React.ComponentType<P>,
  boundaryProps: ErrorBoundaryProps = {}
): React.FC<P> {
  const BoundaryComponent: React.FC<P> = (props) => (
    <QueryBoundary {...boundaryProps}>
      <Component {...props} />
    </QueryBoundary>
  );
  return BoundaryComponent;
}
