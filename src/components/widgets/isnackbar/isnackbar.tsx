import {
  forwardRef,
  useDeferredValue,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import type {
  AnimationDefinition,
  AnimationProps,
  Target,
  Transition,
} from 'framer-motion';
import { motion } from 'framer-motion';

import { isFinite, isObject, isTrue } from '@busymango/is-esm';
import { isEqual } from '@busymango/utils';

import type { EventStateParams } from '@/hooks';
import {
  useEventState,
  useMemoFunc,
  useResizeObserver,
  useTimeout,
} from '@/hooks';
import type { ReactTargetType } from '@/models';

import type { ISignType } from '../isign';
import { ISignLine } from '../isign';
import { ISVGWrap } from '../isvg-wrap';
import { useSnackbars } from './hooks';
import type { ISnackbarProps } from './models';

import styles from './index.scss';

const iAnimate = (height?: number): Target => ({
  height,
  scale: 1,
  opacity: 1,
  originY: 0,
});

const initial: AnimationProps['initial'] = {
  scale: 0.36,
  opacity: 0,
  height: 0,
};

const transition: Transition = {
  ease: 'circIn',
  duration: 0.2,
};

const isFinitePositive = (source: unknown): source is number => {
  return isFinite(source) && source > 0;
};

const iHoverParams = (target: ReactTargetType): EventStateParams => ({
  target,
  end: 'mouseleave',
  start: 'mouseenter',
});

const iSnackbarSign = (status?: ISnackbarProps['status']): ISignType => {
  switch (status) {
    case 'info':
      return 'info';
    case 'success':
      return 'tick';
    case 'error':
      return 'cross';
    default:
      return 'cross';
  }
};

export const ISnackbar = forwardRef<HTMLDivElement, ISnackbarProps>(
  function ISnackbar(props, ref) {
    const {
      id,
      close,
      style,
      content,
      children,
      className,
      icon = true,
      duration = 3,
      status = 'info',
      size = 'medium',
      onExit,
      ...others
    } = props;

    const target = useRef(null);

    const [height, setHeight] = useState<number>();

    const isHover = useEventState(iHoverParams(target));

    const iDestory = useSnackbars(({ destory }) => destory);

    const destory = useMemoFunc(() => iDestory(id));

    useImperativeHandle(ref, () => target.current!);

    const api = useRef({ id, destory });

    useTimeout(destory, {
      wait: duration,
      enabled: !isHover && isFinitePositive(duration),
    });

    useResizeObserver(target, ({ scrollHeight }) => {
      if (height !== scrollHeight) setHeight(scrollHeight);
    });

    const onAnimationComplete = useMemoFunc(
      (animation: AnimationDefinition) => {
        if (isObject(animation) && isEqual(animation, initial)) {
          onExit?.(api.current);
        }
      }
    );

    return (
      <motion.div
        ref={target}
        animate={iAnimate(useDeferredValue(height))}
        className={classNames(
          styles.snackbar,
          styles[status],
          styles[size],
          className
        )}
        exit={initial}
        initial={initial}
        style={style}
        transition={transition}
        onAnimationComplete={onAnimationComplete}
        {...others}
      >
        {icon && (
          <ISVGWrap className={styles.icon} x={'-0.35em'}>
            {isTrue(icon) ? (
              <ISignLine ring type={iSnackbarSign(status)} />
            ) : (
              icon
            )}
          </ISVGWrap>
        )}
        <motion.div>{children ?? content}</motion.div>
        {close && <ISVGWrap onClick={destory}>{close}</ISVGWrap>}
      </motion.div>
    );
  }
);
