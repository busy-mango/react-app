import { useEffect, useMemo, useState } from 'react';

import { debounce } from '@busymango/utils';

export function useDebounceState<T = unknown>(state?: T, wait = 300) {
  const [iState, setMemoState] = useState<T | undefined>(state);

  const func = useMemo(() => debounce(setMemoState, wait), [wait]);

  useEffect(() => {
    func.starer(state);
  }, [state, func]);

  return iState;
}
