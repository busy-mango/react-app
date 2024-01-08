import { useState } from 'react';

import { useMemoFunc } from './memo.func';

export interface ControlComponentProps<T> {
  value?: T;
  onChange?: (value?: T) => void;
}

export function useControlState<T = unknown>(props: ControlComponentProps<T>) {
  const { value: control, onChange: change } = props;

  const isControl = 'value' in props;

  const [inner, setInner] = useState<T>();

  const value = isControl ? control : inner;

  const onChange = useMemoFunc((current?: T) => {
    isControl ? change?.(current) : setInner(current);
  });

  return { isControl, value, onChange };
}
