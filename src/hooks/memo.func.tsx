/**
 * @description 保持函数引用不变
 */

import { useRef } from 'react';

import type { ConstrainedFunc } from '@/models/common';

export function useMemoFunc<T extends ConstrainedFunc<T>>(func: T) {
  const memo = useRef<T>(function (this: unknown, ...args) {
    return ref.current!.call(this, ...args);
  } as T);

  const ref = useRef<T>();

  ref.current = func;

  return memo.current;
}
