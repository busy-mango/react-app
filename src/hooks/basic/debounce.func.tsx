import { useEffect, useRef } from 'react';

import type { ConstrainedFunc } from '@busymango/utils';
import { debounce } from '@busymango/utils';

export function useDebounceFunc<T extends ConstrainedFunc<T>>(
  func?: T,
  wait = 300
) {
  const ref = useRef<T | undefined>(func);

  useEffect(() => {
    ref.current = func;
  });

  const memo = useRef(
    debounce(
      function (this: unknown, ...args) {
        return ref.current?.call(this, ...args);
      } as T,
      wait
    )
  );

  useEffect(() => {
    const { params } = memo.current ?? {};
    if (params?.wait !== wait) {
      memo.current?.cancel();
      memo.current = debounce(
        function (this: unknown, ...args) {
          return ref.current?.call(this, ...args);
        } as T,
        wait
      );
    }
  }, [wait]);

  return memo.current;
}
