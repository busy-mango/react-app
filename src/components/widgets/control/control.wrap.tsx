import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { useEventState } from '@/hooks';

import { useIFieldGridContext } from '../form-field/hooks';
import { IClipSpinner } from '../spinners';
import { IWave } from '../wave';
import type { IControlWrapProps } from './models';

import * as styles from './index.scss';

export const IControlWrap = forwardRef<HTMLDivElement, IControlWrapProps>(
  function IControlWrap(props, ref) {
    const ctx = useIFieldGridContext();

    const {
      prefix,
      suffix,
      children,
      className,
      isLoading,
      suffixClickable,
      status = 'success',
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
        data-ui-field-wrap
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
            <motion.div
              className={classNames(styles.iconWrap, {
                [styles.clickable]: suffixClickable,
              })}
              onClick={onSuffixClick}
            >
              {isLoading ? <IClipSpinner /> : suffix}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
