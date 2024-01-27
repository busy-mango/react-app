import { useEffect, useRef } from 'react';

import { isTrue } from '@busymango/is-esm';
import { and } from '@busymango/utils';

export function useEffectOnce(callback: React.EffectCallback, enabled = true) {
  const once = useRef(true);

  useEffect(() => {
    if (and([once.current, enabled], isTrue)) {
      once.current = false;
      return callback();
    }
  }, [callback, enabled]);
}
