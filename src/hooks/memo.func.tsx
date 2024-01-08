/**
 * @description 保持函数引用不变
 */

import { useEffect, useRef } from 'react';

import type { ConstrainedFunc } from '@/models/common';

export function useMemoFunc<T extends ConstrainedFunc<T>>(func: T) {
  const ref = useRef<T>();

  const memo = useRef<T>(func);

  useEffect(() => {
    ref.current = func;
    if (!memo.current) {
      memo.current = function (this: unknown, ...args) {
        return ref.current!.call(this, ...args);
      } as T;
    }
  });

  return memo.current;
}
