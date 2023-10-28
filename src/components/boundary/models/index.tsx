/**
 * @author 徐子梁
 * @description ErrorBoundary models
 */

/**
 * ErrorBoundary state define
 */
export interface ErrorBoundaryState {
  /** 是否捕获到异常 */
  isCaught: boolean;
  /** 捕获到的异常实例 */
  error: unknown;
}

/**
 * ErrorBoundary props define
 */
export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onReset?: (...args: unknown[]) => void;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

/**
 *  Fallback Component context value define
 */
export interface FallbackContextVal extends ErrorBoundaryState {
  reset: ErrorBoundaryProps['onReset'];
}
