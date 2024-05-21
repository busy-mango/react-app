import { useMemo, useState } from 'react';

import { isBoolean } from '@busymango/is-esm';

import { useMemoFunc } from './memo.func';

export function useToggle(initial = false) {
  const [open, setOpen] = useState(initial);

  const on = useMemoFunc(() => setOpen(true));

  const off = useMemoFunc(() => setOpen(false));

  const toggle = useMemoFunc((value?: unknown) => {
    setOpen((state) => (isBoolean(value) ? value : !state));
  });

  const actions = useMemo(() => ({ on, off, toggle }), [on, off, toggle]);

  return [open, actions] as const;
}
