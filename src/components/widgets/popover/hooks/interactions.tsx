import type { FloatingRootContext } from '@floating-ui/react';
import {
  useClick,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import type { IPopoverEvent, IPopoverProps } from '../models';

const iRole = (mode: IPopoverProps['mode']) => {
  switch (mode) {
    case 'tip':
      return 'tooltip' as const;
    case 'over':
      return 'menu' as const;
    case 'confirm':
      return 'dialog' as const;
  }
};

export const useInterax = (
  context: FloatingRootContext,
  {
    mode,
    events,
  }: {
    events: IPopoverEvent[];
    mode: IPopoverProps['mode'];
  }
) => {
  const role = useRole(context, { role: iRole(mode) });
  const focus = useFocus(context, {
    enabled: events?.includes('focus'),
  });
  const hover = useHover(context, {
    delay: 300,
    enabled: events?.includes('hover'),
  });
  const click = useClick(context, {
    enabled: events?.includes('click'),
  });
  const dismiss = useDismiss(context);

  return useInteractions([role, click, focus, hover, dismiss]);
};
