import { useEffect, useRef } from 'react';

export function usePrevious<T>(state?: T) {
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}
