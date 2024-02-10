/**
 * @description react-query 的异常边界
 */

import {
  QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';

import type { ErrorBoundaryProps } from '../../models';
import { ErrorBoundary } from '../error-boundary';

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
