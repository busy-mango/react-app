import { useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isNumber, isTrue } from '@busymango/is-esm';

import { useDebounceFunc, useMemoFunc } from '@/hooks';
import type { ReactButtonProps, ReactCFC, ReactMotionDomProps } from '@/models';
import { iPropagation } from '@/utils';

import type { ControlUISize } from '../control';
import { IClipSpinner } from '../spinners';
import { IWave } from '../wave';

import * as styles from './index.scss';

const IconWrap: ReactCFC = ({ children }) => (
  <motion.span
    animate={{ opacity: 1, width: '1em' }}
    className={styles.icon}
    exit={{ opacity: 0, width: 0 }}
    initial={{ opacity: 0, width: 0 }}
    transition={{ ease: 'easeOut' }}
  >
    {children}
  </motion.span>
);

export interface IButtonProps extends ReactMotionDomProps<ReactButtonProps> {
  wave?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
  debounce?: boolean | number;
  size?: ControlUISize | 'inline';
  variant?: 'filled' | 'bordered' | 'text';
}

const iTapBackground = (params: { variant: IButtonProps['variant'] }) => {
  const { variant } = params;
  if (variant === 'text') {
    return 'rgb(0 0 0 / 0.06)';
  }
};

export const IButton: React.FC<IButtonProps> = (props) => {
  const {
    icon,
    wave,
    children,
    disabled,
    debounce,
    className,
    isLoading,
    isFullWidth,
    size = 'medium',
    variant = 'bordered',
    onPointerDownCapture,
    onClick,
    ...others
  } = props;

  const clickable = !isLoading && !disabled;

  const ref = useRef<HTMLButtonElement>(null);

  const wait = isNumber(debounce) ? debounce : 300;

  const { starer } = useDebounceFunc(onClick, wait);

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
          [styles.disabled]: disabled,
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
        {isLoading ? (
          <IconWrap>
            <IClipSpinner />
          </IconWrap>
        ) : (
          icon && <IconWrap>{icon}</IconWrap>
        )}
      </AnimatePresence>
      <span>{children}</span>
    </motion.button>
  );
};
