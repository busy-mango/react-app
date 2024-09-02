import { useLayoutEffect, useRef, useState } from 'react';

import { isUndefined } from '@busymango/is-esm';

import { useMemoFunc } from '@/hooks';

export interface ControlParams {
  /** 输入法是否介入中 */
  isComposing?: boolean;
}

export interface ControlComponentProps<T, E, Args extends unknown[]> {
  value?: T;
  defaultValue?: T;
  onCatch?: (source: E) => T;
  onChange?: (value: E, ...args: Args) => void;
}

export function useControlState<
  T = unknown,
  E = T,
  Args extends unknown[] = unknown[],
>(props: ControlComponentProps<T, E, Args>, params: ControlParams = {}) {
  const { isComposing } = params;

  const {
    value,
    defaultValue,
    onChange,
    onCatch = (source) => source as unknown as T,
  } = props;

  /** 使用输入法时取消受控状态 */
  const isControl = !isUndefined(value) && !isComposing;

  const [inner, setInner] = useState<T | undefined>(() =>
    isControl ? value : defaultValue
  );

  const control = isControl ? value : inner;

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

  const iChange = useMemoFunc((next: E, ...args: Args) => {
    setInner(onCatch(next));
    onChange?.(next, ...args);
  });

  return [control, iChange] as const;
}
