/**
 * @author 徐子梁
 * @description 异常边界
 */

import { Component } from 'react';

import { catchMsg } from '@utils/index';

import { FallbackProvider} from './context';
import { ErrorBoundaryProps, ErrorBoundaryState } from './models';

const initial: ErrorBoundaryState = {
  error: null,
  isCaught: false,
};

export class ErrorBoundary extends Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = initial;

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { isCaught: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset: ErrorBoundaryProps['onReset'] = (...args: unknown[]) => {
    const { onReset } = this.props;
    const { isCaught } = this.state;

    if (isCaught) {
      onReset?.(args);
      this.setState(initial);
    }
  };

  render() {
    const { reset } = this;
    const { error, isCaught } = this.state;
    const { children, fallback } = this.props;
    
    return isCaught ? (
      <FallbackProvider
        reset={reset}
        error={error}
        isCaught={isCaught}
      >
        {fallback ?? <h1>{catchMsg(error) ?? 'something was error'}</h1>}
      </FallbackProvider>
    ) : children;
  }
}
