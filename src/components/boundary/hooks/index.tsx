/**
 * @author 徐子梁
 * @description ErrorBoundary Hooks
 */

import { useContext } from 'react';

import { FallbackContext } from '../context';

/** Fallback context hooks */
export function useFallbackContext() {
  return useContext(FallbackContext) ?? {};
}
