import { useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isTrue } from '@busymango/is-esm';

import { useMemoFunc } from '@/hooks';
import type { ReactCFC } from '@/models';
import { iEscapeEvent, iPropagation } from '@/utils';

import { ISignLine } from '../sign';
import { IClipSpinner } from '../spinners';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import type { IChipProps } from './models';

import * as styles from './index.scss';

export const IChip: ReactCFC<IChipProps> = (props) => {
  const {
    icon,
    close,
    style,
    children,
    clickable,
    className,
    isLoading,
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
      style={style}
      onKeyDown={iEscapeEvent(onClose, onKeyDown)}
    >
      {clickable && <IWave target={target} />}
      <AnimatePresence>
        {isLoading ? (
          <ISVGWrap className={styles.icon}>
            <IClipSpinner />
          </ISVGWrap>
        ) : (
          icon && <ISVGWrap className={styles.icon}>{icon}</ISVGWrap>
        )}
      </AnimatePresence>
      {children}
      <AnimatePresence>
        {close && (
          <ISVGWrap className={styles.close} onClick={iClose}>
            {isTrue(close) ? <ISignLine type="cross" /> : close}
          </ISVGWrap>
        )}
      </AnimatePresence>
    </motion.span>
  );
};
