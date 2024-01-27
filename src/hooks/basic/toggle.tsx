import { useMemo, useState } from 'react';

import { useMemoFunc } from './memo.func';

export function useToggle(initial = false) {
  const [open, setOpen] = useState(initial);

  const on = useMemoFunc(() => setOpen(true));

  const off = useMemoFunc(() => setOpen(false));

  const toggle = useMemoFunc(() => setOpen((state) => !state));

  const actions = useMemo(() => ({ on, off, toggle }), [on, off, toggle]);

  return [open, actions] as const;
}
