import { useLayoutEffect, useRef, useState } from 'react';

import { isUndefined } from '@busymango/is-esm';

import { useMemoFunc } from './memo.func';
import { useRecord } from './record';

export interface ControlParams {
  /** 输入法是否介入中 */
  isComposing?: boolean;
}

export interface ControlComponentProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value?: T) => void;
}

export function useControlState<T = unknown>(
  props: ControlComponentProps<T>,
  params?: ControlParams
) {
  const { value, defaultValue, onChange } = props;

  const { isComposing } = params ?? {};

  /** 使用输入法时取消受控状态 */
  const isControl = !isUndefined(value) && !isComposing;

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
    if (isFirstMount.current) return;
    if (inner !== record) onControl?.(inner);
  }, [record, inner, onControl]);

  useLayoutEffect(() => {
    if (isFirstMount.current) return;
    if (isControl) setInner(value);
  }, [value, isControl]);

  const iChange = useMemoFunc((next?: T) => {
    setInner(next);
  });

  return [control, iChange] as const;
}
