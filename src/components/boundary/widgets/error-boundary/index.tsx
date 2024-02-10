/**
 * @description 异常边界
 */

import { Component } from 'react';

import { catchMsg } from '@/utils';

import { FallbackProvider } from '../../context';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../models';

const initial: ErrorBoundaryState = {
  error: null,
  info: undefined,
  isCaught: false,
};

export class ErrorBoundary extends Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = initial;

  static getDerivedStateFromError = (error: Error): ErrorBoundaryState => ({
    isCaught: true,
    error,
  });

  componentDidCatch = (error: Error, info: React.ErrorInfo) => {
    this.setState({ info });
    this.props.onError?.(error, info);
  };

  reset: ErrorBoundaryProps['onReset'] = (...args: unknown[]) => {
    const { onReset } = this.props;
    const { isCaught } = this.state;

    if (isCaught) {
      onReset?.(args);
      this.setState(initial);
    }
  };

  render = () => {
    const { reset } = this;
    const { children, fallback } = this.props;
    const { error, info, isCaught } = this.state;

    if (isCaught) {
      return (
        <FallbackProvider
          error={error}
          info={info}
          isCaught={isCaught}
          reset={reset}
        >
          {fallback ?? <h1>{catchMsg(error) ?? 'something was error'}</h1>}
        </FallbackProvider>
      );
    }

    return children;
  };
}
