import { useState } from 'react';

import { useMemoFunc } from './memo.func';

export interface ControlComponentProps<T> {
  value?: T;
  onChange?: (value?: T) => void;
}

export function useControlState<T = unknown>(
  props: ControlComponentProps<T>,
  params: {
    isControl?: boolean;
  } = {}
) {
  const { isControl = false } = params;

  const [inner, setInner] = useState<T>();

  const { value: control, onChange: onControl } = props;

  const onChange = useMemoFunc((current?: T) => {
    setInner(current);
    onControl?.(current);
  });

  return [isControl ? control : inner, onChange] as const;
}
