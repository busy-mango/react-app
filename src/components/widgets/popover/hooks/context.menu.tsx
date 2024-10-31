import { useEffect } from 'react';

import type { FloatingRootContext, OpenChangeReason } from '@floating-ui/react';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

export interface ContextMenuParams {
  target?: ReactTargetType;
  /**
   * Whether to toggle the open state with repeated clicks.
   * @default true
   */
  toggle?: boolean;
  /**
   * Whether the Hook is enabled, including all internal Effects and event
   * handlers.
   * @default true
   */
  enabled?: boolean;
}

export function useContextMenu(
  context: FloatingRootContext,
  params: ContextMenuParams = {},
  onOpenChange: (
    open: boolean,
    event?: Event,
    reason?: OpenChangeReason
  ) => void
) {
  const { refs, dataRef } = context;

  const { enabled = true, toggle = true, target } = params;

  useEffect(() => {
    const current = iFindElement(target);
    if (current && enabled) {
      const iListener = (event: MouseEvent) => {
        if (event.button === 2) {
          event.preventDefault();
          refs.setPositionReference({
            getBoundingClientRect() {
              return {
                width: 0,
                height: 0,
                x: event.clientX,
                y: event.clientY,
                top: event.clientY,
                left: event.clientX,
                right: event.clientX,
                bottom: event.clientY,
              };
            },
          });

          onOpenChange(true, event, 'escape-key');
        }
      };
      current.addEventListener('contextmenu', iListener);
      return () => {
        current.removeEventListener('contextmenu', iListener);
      };
    }
  }, [enabled, refs, target, onOpenChange]);
}
