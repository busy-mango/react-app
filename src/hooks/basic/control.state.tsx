import { useLayoutEffect, useRef, useState } from 'react';

import { isFalse, isUndefined } from '@busymango/is-esm';

import { useMemoFunc } from './memo.func';
import { useRecord } from './record';

type Updater<T> = (val: T) => void;

export interface ControlComponentProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value?: T, prevValue?: T) => void;
}

export function useControlState<T = unknown>(props: ControlComponentProps<T>) {
  const { value, defaultValue, onChange } = props;

  const isControl = !isUndefined(value);

  const [inner, setInner] = useState<T | undefined>(
    isControl ? value : defaultValue
  );

  const control = isControl ? value : inner;

  const record = useRecord(control);

  const onControl = useMemoFunc(onChange);

  const isFirstMount = useRef(true);

  useLayoutEffect(() => {
    isFirstMount.current = false;
    return () => {
      isFirstMount.current = true;
    };
  }, []);

  useLayoutEffect(() => {
    const { current } = isFirstMount;
    if (isFalse(current) && inner !== record) {
      onControl?.(inner, record);
    }
  }, [record, inner, onControl]);

  useLayoutEffect(() => {
    const { current } = isFirstMount;
    if (isFalse(current) && isControl) {
      setInner(value);
    }
  }, [value, isControl]);

  const onTrigger: Updater<T> = useMemoFunc((next) => {
    setInner(next);
  });

  return [control, onTrigger] as const;
}
