import { useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';

import { isEmpty, isNumber, isTrue } from '@busymango/is-esm';
import { FRAME2MS } from '@busymango/utils';

import { useDebounceFunc, useMemoFunc } from '@/hooks';
import { iPropagation } from '@/utils';

import { ISpinner } from '../spinners';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import type { IButtonProps } from './models';

import * as styles from './index.scss';

export const IButton: React.FC<IButtonProps> = (props) => {
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
    ref: iForwardRef,
    onPointerDownCapture,
    onClick,
    ...others
  } = props;

  const isText = variant === 'text';

  const clickable = !isLoading && !disabled;

  const ref = useRef<HTMLButtonElement>(null);

  const wave = iWave ?? (variant === 'filled' && !danger);

  const wait = isNumber(debounce) ? debounce : 5 * FRAME2MS;

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
        scale: !isText ? [null, 0.98] : undefined,
      }}
      onClick={onTap}
      onPointerDownCapture={(event) => {
        if (!clickable) iPropagation(event);
        onPointerDownCapture?.(event);
      }}
      {...others}
    >
      {wave && <IWave target={ref} />}
      <AnimatePresence>
        {(isLoading || icon) && (
          <ISVGWrap
            className={classNames(
              styles.icon,
              !isEmpty(children) && styles.gap
            )}
          >
            {isLoading ? <ISpinner /> : icon}
          </ISVGWrap>
        )}
      </AnimatePresence>
      {children && <span>{children}</span>}
    </motion.button>
  );
};

export type { IButtonProps } from './models';
