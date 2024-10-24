import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { isFalse, isHTMLElement } from '@busymango/is-esm';
import { compact, iArray, ifnot } from '@busymango/utils';
import {
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  useFloating,
} from '@floating-ui/react';

import { container } from '@/init';
import { iFindElement, iPropagation, isOverflow } from '@/utils';

import { useControlState } from '../control';
import {
  ARROW_HEIGHT,
  ARROW_RADIUS,
  iFill,
  iFloatingMotion,
  middlewares,
} from './helpers';
import { useInterax } from './hooks';
import type { IPopoverProps, IPopoverRef, IPopoverState } from './models';

import * as styles from './index.scss';

export const IPopover = forwardRef<IPopoverRef, IPopoverProps>(
  function IPopover(props, ref) {
    const {
      root,
      content,
      open: iOpen,
      padding = 5,
      timing = 'alway',
      trigger = 'click',
      transform = false,
      variant = 'tooltip',
      placement: _placement,
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

    const middleware = useMemo(
      () => middlewares({ iArrow, padding, root, onApplyFloatingStyle }),
      [onApplyFloatingStyle, padding, root]
    );

    const { refs, context, placement, floatingStyles } = useFloating({
      open,
      transform,
      middleware,
      placement: _placement,
      whileElementsMounted: autoUpdate,
      onOpenChange,
    });

    useImperativeHandle(ref, () => refs, [refs]);

    const { current: reference } = refs.reference ?? {};

    const interax = useInterax(context, { variant, events });

    const states: IPopoverState = { open: context.open, placement };

    const isReferenceOverflow = useMemo(() => {
      if (timing === 'overflow') {
        return isOverflow(ifnot(isHTMLElement(reference) && reference));
      }
    }, [reference, timing]);

    const iRoot = iFindElement(root) ?? container;

    return (
      <Fragment>
        {children?.(
          {
            ref: refs.setReference,
            ...interax.getReferenceProps(),
          },
          states
        )}
        {context.open && !isFalse(isReferenceOverflow) && (
          <FloatingPortal key={String(context.open)} root={iRoot}>
            <motion.div
              ref={refs.setFloating}
              className={classNames(styles.wrap, styles[variant])}
              {...interax.getFloatingProps({
                onClick: iPropagation,
              })}
              {...iFloatingMotion(floatingStyles)}
            >
              <div className={styles.content}>{content}</div>
              <FloatingArrow
                ref={iArrow}
                context={context}
                fill={iFill(variant)}
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
