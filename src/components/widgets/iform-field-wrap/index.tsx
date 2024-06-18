import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

import type {
  ControlUISize,
  ControlValidationStatus,
} from '@/components/models';
import { useEventState } from '@/hooks';
import type { ReactMotionDomProps, WrapperProps } from '@/models';

import { useIFieldGridContext } from '../iform-field/hooks';
import { IClipSpinner } from '../ispinners';
import { IWave } from '../iwave';

import styles from './index.scss';

export interface IFieldWrapProps
  extends OmitOf<ReactMotionDomProps<WrapperProps>, 'prefix'> {
  status?: ControlValidationStatus;

  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: ControlUISize;
  isLoading?: boolean;
  /** 变体 */
  variant?: 'filled' | 'standard' | 'bordered';
  onPrefixClick?: React.MouseEventHandler<HTMLDivElement>;
  onSuffixClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const IFieldWrap = forwardRef<HTMLDivElement, IFieldWrapProps>(
  function IFieldWrap(props, ref) {
    const ctx = useIFieldGridContext();

    const {
      prefix,
      suffix,
      children,
      className,
      isLoading,
      variant = 'standard',
      size = ctx?.size ?? 'medium',
      onSuffixClick,
      onPrefixClick,
      ...others
    } = props;

    const target = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => target.current!, [target]);

    const isFocus = useEventState({
      target,
      end: 'focusout',
      start: 'focusin',
    });

    return (
      <motion.div
        ref={target}
        className={classNames(
          styles.wrap,
          styles[size],
          styles[variant],
          className
        )}
        {...others}
      >
        <AnimatePresence>
          {prefix && (
            <motion.div className={styles.iconWrap} onClick={onPrefixClick}>
              {prefix}
            </motion.div>
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
          {(isLoading || suffix) && (
            <motion.div className={styles.iconWrap} onClick={onSuffixClick}>
              {isLoading ? <IClipSpinner /> : suffix}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
