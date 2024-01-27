import type { SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useMemoFunc } from './memo.func';

export type RafActions<T> = SetStateAction<T | undefined>;

export default function useFrameState<S>(initial?: S | (() => S | undefined)) {
  const ref = useRef(0);

  const [state, setState] = useState(initial);

  const cancel = useCallback(() => cancelAnimationFrame(ref.current), []);

  const frame = useMemoFunc((callback: FrameRequestCallback) => {
    ref.current = requestAnimationFrame(callback);
  });

  const setRafState = useMemoFunc((value: RafActions<S>) => {
    cancel();
    frame(() => setState(value));
  });

  useEffect(() => cancel, [cancel]);

  return [state, setRafState] as const;
}
