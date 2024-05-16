import { Fragment, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import type { UseFloatingOptions } from '@floating-ui/react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import { useControlState } from '@/hooks';
import { container } from '@/init';
import type { ReactCFC } from '@/models';
import { iArray } from '@/utils';

import styles from './index.scss';

export interface InteractionProps {
  ref: (node: HTMLElement | SVGElement | null) => void;
  onBlur?(): void;
  onFocus?(): void;
  onClick?(): void;
  onKeyUp?(): void;
  onKeyDown?(): void;
  onMouseDown?(): void;
  onMouseMove?(): void;
  onPointerDown?(): void;
  onPointerEnter?(): void;
}

export type IPopoverEvent = 'click' | 'focus' | 'hover';

export interface IPopoverProps
  extends Pick<
    UseFloatingOptions,
    'open' | 'onOpenChange' | 'placement' | 'transform'
  > {
  content?: React.ReactNode;
  type?: 'tip' | 'over' | 'confirm';
  trigger?: IPopoverEvent | IPopoverEvent[];
  render?: (props: InteractionProps) => React.ReactNode;
}

const GAP = 2;

const ARROW_HEIGHT = 7;

export const IPopover: ReactCFC<IPopoverProps> = (props) => {
  const {
    content,
    type = 'over',
    trigger = 'click',
    transform = false,
    render,
  } = props;

  const iArrow = useRef(null);

  const iTriggerList = iArray(trigger);

  const [open, onOpenChange] = useControlState(
    {
      value: props.open,
      onChange: props.onOpenChange,
    },
    { isControl: 'open' in props }
  );

  const { refs, context, placement, floatingStyles } = useFloating({
    open,
    transform: transform,
    placement: props?.placement ?? 'top',
    onOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      offset(ARROW_HEIGHT + GAP),
      arrow({
        element: iArrow,
      }),
    ],
  });

  const role = useRole(context, {
    role: 'tooltip',
  });
  const focus = useFocus(context, {
    enabled: iTriggerList?.includes('focus'),
  });
  const hover = useHover(context, {
    enabled: iTriggerList?.includes('hover'),
  });
  const click = useClick(context, {
    enabled: iTriggerList?.includes('click'),
  });
  const dismiss = useDismiss(context);

  const initial = useMemo(() => {
    if (placement.startsWith('top')) {
      return { translateY: 5 };
    }
    if (placement.startsWith('left')) {
      return { translateX: 5 };
    }
    if (placement.startsWith('right')) {
      return { translateX: -5 };
    }
    if (placement.startsWith('bottom')) {
      return { translateY: -5 };
    }
  }, [placement]);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    role,
    click,
    focus,
    hover,
    dismiss,
  ]);

  return (
    <Fragment>
      {render?.({
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      <FloatingPortal root={container}>
        {open && (
          <motion.div
            ref={refs.setFloating}
            animate={{
              opacity: 1,
              translateX: 0,
              translateY: 0,
            }}
            className={classNames(styles.wrap, styles[type])}
            exit={{
              ...initial,
              opacity: 0,
            }}
            initial={{
              opacity: 0,
              ...initial,
            }}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={iArrow}
              context={context}
              fill={`rgb(var(--${type}-bg-color))`}
              fillOpacity={0.8}
              height={ARROW_HEIGHT}
              tipRadius={2}
            />
            {content}
          </motion.div>
        )}
      </FloatingPortal>
    </Fragment>
  );
};
