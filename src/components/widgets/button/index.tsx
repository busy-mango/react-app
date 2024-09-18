import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { isNumber, isTrue } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';

import { useDebounceFunc, useMemoFunc } from '@/hooks';
import { iPropagation } from '@/utils';

import type { ControlUISize } from '../control';
import { ISpinner } from '../spinners';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';

import * as styles from './index.scss';

export interface IButtonProps
  extends React.PropsWithChildren,
    OmitOf<HTMLMotionProps<'button'>, 'children'> {
  capsule?: boolean;
  danger?: boolean;
  debounce?: boolean | number;
  icon?: React.ReactNode;
  isFullWidth?: boolean;
  isLoading?: boolean;
  size?: ControlUISize;
  variant?: 'filled' | 'bordered' | 'text';
  wave?: boolean;
}

const iTapBackground = (params: { variant: IButtonProps['variant'] }) => {
  const { variant } = params;
  if (variant === 'text') {
    return 'rgb(0 0 0 / 0.06)';
  }
};

export const IButton: React.FC<IButtonProps> = forwardRef<
  HTMLButtonElement,
  IButtonProps
>(function IButton(props, iForwardRef) {
  const {
    icon,
    danger,
    capsule,
    children,
    disabled,
    debounce,
    className,
    isLoading,
    isFullWidth,
    wave: iWave,
    size = 'medium',
    variant = 'bordered',
    onPointerDownCapture,
    onClick,
    ...others
  } = props;

  const wave = iWave ?? !danger;

  const clickable = !isLoading && !disabled;

  const ref = useRef<HTMLButtonElement>(null);

  const wait = isNumber(debounce) ? debounce : 300;

  const { starer } = useDebounceFunc(onClick, wait);

  useImperativeHandle(iForwardRef, () => ref.current!, [ref]);

  const onTap = useMemoFunc<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const debounceable = isTrue(debounce) || isNumber(debounce);
      clickable && (debounceable ? starer(event) : onClick?.(event));
    }
  );

  return (
    <motion.button
      ref={ref}
      layout
      className={classNames(
        styles.wrap,
        styles[size],
        styles[variant],
        {
          [styles.danger]: danger,
          [styles.capsule]: capsule,
          [styles.disabled]: disabled,
          [styles.padding]: !!children,
          [styles.fullWidth]: isFullWidth,
        },
        className
      )}
      disabled={disabled}
      type="button"
      whileTap={{
        scale: [null, 0.96],
        backgroundColor: iTapBackground({ variant }),
      }}
      onClick={onTap}
      onPointerDownCapture={(event) => {
        if (!clickable) iPropagation(event);
        onPointerDownCapture?.(event);
      }}
      {...others}
    >
      {(wave ?? variant !== 'text') && <IWave target={ref} />}
      <AnimatePresence>
        {(isLoading || icon) && (
          <ISVGWrap className={classNames(styles.icon, children && styles.gap)}>
            {isLoading ? <ISpinner /> : icon}
          </ISVGWrap>
        )}
      </AnimatePresence>
      {children && <span>{children}</span>}
    </motion.button>
  );
});
