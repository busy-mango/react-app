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

const iRole = (variant: IPopoverProps['variant']) => {
  switch (variant) {
    case 'tooltip':
      return 'tooltip' as const;
    case 'card':
      return 'menu' as const;
    case 'confirm':
      return 'dialog' as const;
  }
};

export const useInterax = (
  context: FloatingRootContext,
  {
    variant,
    events,
  }: {
    events: IPopoverEvent[];
    variant: IPopoverProps['variant'];
  }
) => {
  const role = useRole(context, { role: iRole(variant) });
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
