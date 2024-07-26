/**
 * @description 异常边界
 */

import { Component } from 'react';
import { t } from 'i18next';

import { catchMsg } from '@/utils';

import { FallbackProvider } from '../../hooks';
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
    this.props.onError?.(error, info);
    this.setState({ error, info, isCaught: true });
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
    const message = catchMsg(error) ?? t('common:Oops');

    if (isCaught) {
      return (
        <FallbackProvider
          error={error}
          info={info}
          isCaught={isCaught}
          reset={reset}
        >
          {fallback ?? <p>{message}</p>}
        </FallbackProvider>
      );
    }

    return children;
  };
}
