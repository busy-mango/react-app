import { useEffect, useRef } from 'react';

export function useEffectOnce(
  callback: React.EffectCallback,
  enabled: boolean
) {
  const once = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    if (once.current) {
      once.current = false;
      callback();
    }
  }, [callback, enabled]);
}
