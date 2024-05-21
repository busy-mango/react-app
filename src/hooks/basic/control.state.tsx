import { useState } from 'react';

import { useMemoFunc } from './memo.func';

export interface ControlComponentProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControlState<T = unknown>(
  props: ControlComponentProps<T>,
  params: {
    isControl?: boolean;
  } = {}
) {
  const { isControl = false } = params;

  const { value: control, defaultValue, onChange: onControl } = props;

  const [inner, setInner] = useState<T | undefined>(defaultValue);

  const onChange = useMemoFunc((current: T) => {
    setInner(current);
    onControl?.(current);
  });

  return [isControl ? control : inner, onChange] as const;
}
