import { useLayoutEffect, useRef, useState } from 'react';

import { isUndefined } from '@busymango/is-esm';

import { useMemoFunc } from '@/hooks';

export interface ControlParams {
  /** 输入法是否介入中 */
  isComposing?: boolean;
}

export interface ControlComponentProps<T, Args extends unknown[]> {
  value?: T;
  defaultValue?: T;
  onChange?: (value?: T, ...args: Args) => void;
}

export function useControlState<
  T = unknown,
  Args extends unknown[] = unknown[],
>(props: ControlComponentProps<T, Args>, params: ControlParams = {}) {
  const { isComposing } = params;

  const { value, defaultValue, onChange } = props;

  /** 使用输入法时取消受控状态 */
  const isControl = !isUndefined(value) && !isComposing;

  const [inner, setInner] = useState<T | undefined>(() =>
    isControl ? value : defaultValue
  );

  const control = isControl ? value : inner;

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
    if (isControl && !current) setInner(value);
  }, [value, isControl]);

  const iChange = useMemoFunc((next?: T, ...args: Args) => {
    setInner(next);
    onControl?.(next, ...args);
  });

  return [control, iChange] as const;
}
