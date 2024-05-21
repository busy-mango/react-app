import { useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isTrue } from '@busymango/is-esm';

import type { ReactCFC } from '@/models';
import { iEscapeEvent } from '@/utils';

import { IWave } from '../iwave';
import type { IChipProps } from './models';

import styles from './index.scss';

export const IChip: ReactCFC<IChipProps> = (props) => {
  const {
    icon,
    close,
    children,
    clickable,
    className,
    size = 'medium',
    disabled = false,
    variant = 'filled',
    onKeyDown,
    onClose,
  } = props;

  const target = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={target}
      className={classNames(
        styles.chip,
        styles[size],
        styles[variant],
        {
          [styles.clickable]: clickable,
          [styles.disabled]: clickable && disabled,
        },
        className
      )}
      onKeyDown={iEscapeEvent(onClose, onKeyDown)}
    >
      {clickable && <IWave target={target} />}
      <AnimatePresence>
        {icon && <motion.div className={styles.icon}>{icon}</motion.div>}
        <motion.span>{children}</motion.span>
        {close && (
          <motion.div className={styles.close} onClick={onClose}>
            {isTrue(close) ? 'close' : close}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );
};
