import { useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import type { ControlUISize } from '@/components/models';
import { useEventState } from '@/hooks';
import type { ReactCFC } from '@/models';

import { IWave } from '../iwave';

import styles from './index.scss';

export interface IFieldWrapProps {
  clear?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: ControlUISize;
  /** 变体 */
  variant?: 'filled' | 'standard' | 'bordered';
}

export const IFieldWrap: ReactCFC<IFieldWrapProps> = ({
  prefix,
  suffix,
  children,
  size = 'medium',
  variant = 'standard',
}) => {
  const target = useRef<HTMLDivElement>(null);

  const isFocus = useEventState({
    target,
    end: 'focusout',
    start: 'focusin',
  });

  return (
    <motion.div
      ref={target}
      className={classNames(styles.wrap, styles[size], styles[variant])}
    >
      <AnimatePresence>
        {prefix && (
          <motion.div className={styles.iconWrap}>{prefix}</motion.div>
        )}
      </AnimatePresence>
      {variant !== 'standard' && (
        <IWave
          placeholder={variant === 'bordered' && isFocus}
          target={target}
        />
      )}
      {children}
      <AnimatePresence>
        {suffix && (
          <motion.div className={styles.iconWrap}>{suffix}</motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
