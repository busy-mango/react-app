import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { isElement, isHTMLElement } from '@busymango/is-esm';
import { compact, iArray } from '@busymango/utils';
import { autoUpdate, FloatingArrow, useFloating } from '@floating-ui/react';

import { container } from '@/init';
import { iFindElement, iPropagation, isOverflow } from '@/utils';

import { useControlState } from '../control';
import { IFloating } from '../floating';
import { ARROW_HEIGHT, ARROW_RADIUS, iFill, middlewares } from './helpers';
import { useInterax } from './hooks';
import type {
  IPopoverProps,
  IPopoverRef,
  IPopoverReferenceRender,
  IPopoverState,
} from './models';

import * as styles from './index.scss';

const iReferenceRender: IPopoverReferenceRender = (props) => (
  <motion.span {...props} />
);

export const IPopover = forwardRef<IPopoverRef, IPopoverProps>(
  function IPopover(props, ref) {
    const {
      root,
      render,
      content,
      children,
      open: iOpen,
      timing = 'alway',
      trigger = 'click',
      transform = false,
      variant = 'tooltip',
      placement: _placement,
      onOpenChange: iOpenChange,
      onApplyFloatingStyle,
      ...others
    } = props;

    const events = compact(iArray(trigger));

    const iArrow = useRef<SVGSVGElement>(null);

    const [open, onOpenChange] = useControlState({
      value: iOpen,
      onChange: iOpenChange,
    });

    const middleware = useMemo(
      () => middlewares({ iArrow, variant, root, onApplyFloatingStyle }),
      [onApplyFloatingStyle, root, variant]
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

    const mount = (() => {
      if (timing === 'overflow' && isHTMLElement(reference)) {
        return isOverflow(reference);
      }
      return isElement(reference);
    })();

    return (
      <Fragment>
        {(render?.reference ?? iReferenceRender)(
          {
            children,
            ref: refs.setReference,
            ...interax.getReferenceProps(),
            ...others,
          },
          states
        )}
        {mount && (
          <IFloating
            className={classNames(styles.wrap, styles[variant])}
            context={context}
            portal={{ root: iFindElement(root) ?? container }}
            style={floatingStyles}
            {...interax.getFloatingProps({
              onClick: iPropagation,
            })}
          >
            <div className={styles.content}>{content}</div>
            {variant !== 'card' && (
              <FloatingArrow
                ref={iArrow}
                context={context}
                fill={iFill(variant)}
                height={ARROW_HEIGHT}
                tipRadius={ARROW_RADIUS}
              />
            )}
          </IFloating>
        )}
      </Fragment>
    );
  }
);

export { iFloatingMaxSize } from './helpers';
export type * from './models';
