/**
 * @description react-query 的异常边界
 */

import {
  QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';

import { ErrorBoundary } from './error.boundary';
import type { ErrorBoundaryProps } from './models';

const ErrorResetBoundary: React.FC<
  React.PropsWithChildren<ErrorBoundaryProps>
> = (props) => {
  const { reset } = useQueryErrorResetBoundary();
  return <ErrorBoundary onReset={reset} {...props} />;
};

export const QueryBoundary: React.FC<
  React.PropsWithChildren<ErrorBoundaryProps>
> = (props) => (
  <QueryErrorResetBoundary>
    <ErrorResetBoundary {...props} />
  </QueryErrorResetBoundary>
);
