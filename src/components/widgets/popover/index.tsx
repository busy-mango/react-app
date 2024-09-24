import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { compact, iArray } from '@busymango/utils';
import {
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  useFloating,
} from '@floating-ui/react';

import { container } from '@/init';
import { iFindElement, iPropagation, size2px } from '@/utils';

import { useControlState } from '../control';
import { useFloatingMotion } from './hooks/motion';
import { ARROW_HEIGHT, ARROW_RADIUS, iFill, middlewares } from './helpers';
import { useInterax } from './hooks';
import type { IPopoverProps, IPopoverRef, IPopoverState } from './models';

import * as styles from './index.scss';

export const IPopover = forwardRef<IPopoverRef, IPopoverProps>(
  function IPopover(props, ref) {
    const {
      content,
      open: iOpen,
      mode = 'tip',
      root = container,
      trigger = 'click',
      transform = false,
      padding = size2px(5),
      placement: iPlacement,
      onOpenChange: iOpenChange,
      onApplyFloatingStyle,
      children,
    } = props;

    const events = compact(iArray(trigger));

    const iArrow = useRef<SVGSVGElement>(null);

    const [open, onOpenChange] = useControlState({
      value: iOpen,
      onChange: iOpenChange,
    });

    const { refs, context, placement, floatingStyles } = useFloating({
      open,
      transform,
      placement: iPlacement,
      middleware: middlewares({ iArrow, padding, onApplyFloatingStyle }),
      whileElementsMounted: autoUpdate,
      onOpenChange,
    });

    useImperativeHandle(ref, () => refs, [refs]);

    const motions = useFloatingMotion({ placement });

    const interax = useInterax(context, { mode, events });

    const states: IPopoverState = { open: context.open, placement };

    return (
      <Fragment>
        {children?.(
          {
            ref: refs.setReference,
            ...interax.getReferenceProps(),
          },
          states
        )}
        {context.open && (
          <FloatingPortal root={iFindElement(root)}>
            <motion.div
              ref={refs.setFloating}
              className={classNames(styles.wrap, styles.tip)}
              style={floatingStyles}
              {...interax.getFloatingProps({
                onClick: iPropagation,
              })}
              {...motions}
            >
              <div className={styles.content}>{content}</div>
              <FloatingArrow
                ref={iArrow}
                context={context}
                fill={iFill(mode)}
                height={ARROW_HEIGHT}
                tipRadius={ARROW_RADIUS}
              />
            </motion.div>
          </FloatingPortal>
        )}
      </Fragment>
    );
  }
);

export { iFloatingMaxSize } from './helpers';
export type * from './models';
