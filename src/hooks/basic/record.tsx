import { useEffect, useRef } from 'react';

export function useRecord<T>(state?: T, changeable: boolean = true) {
  const ref = useRef(state);

  useEffect(() => {
    if (changeable) {
      ref.current = state;
    }
  });

  return ref.current;
}
