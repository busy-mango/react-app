import { useEffect, useMemo, useState } from 'react';

import { debounce } from '@busymango/utils';

export function useDebounceState<T = unknown>(state?: T, wait = 300) {
  const [memo, setMemo] = useState<T | undefined>(state);

  const debounced = useMemo(() => debounce(setMemo, wait), [wait, setMemo]);

  useEffect(() => {
    debounced.starer(state);
  }, [state, debounced]);

  return memo;
}
