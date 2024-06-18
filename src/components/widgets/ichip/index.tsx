import { useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isTrue } from '@busymango/is-esm';

import { useMemoFunc } from '@/hooks';
import type { ReactCFC } from '@/models';
import { iEscapeEvent, iPropagation } from '@/utils';

import { ISignLine } from '../isign';
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

  const iClose = useMemoFunc(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      iPropagation(event);
      onClose?.(event);
    }
  );

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
      </AnimatePresence>
      <motion.span>{children}</motion.span>
      <AnimatePresence>
        {close && (
          <motion.div className={styles.close} onClick={iClose}>
            {isTrue(close) ? <ISignLine type="cross" /> : close}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );
};
