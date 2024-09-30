import { forwardRef, useId, useLayoutEffect } from 'react';
import classNames from 'classnames';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

import { isIOS } from '@/utils';

import * as styles from './index.scss';

const iLocks = new Set<string>();

const iScrollbarX = () => {
  const { documentElement } = document;
  const { scrollLeft } = documentElement;
  const { left } = documentElement.getBoundingClientRect();
  return Math.round(left + scrollLeft);
};

const iScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export interface IOverlayProps extends HTMLMotionProps<'div'> {
  /**
   * overlay will lock scrolling on the document body if is false.
   * @default false
   */
  scroll?: boolean;
}

export const IOverlay = forwardRef(function IOverlay(
  props: IOverlayProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { scroll = false, className, ...rest } = props;

  const id = useId();

  useLayoutEffect(() => {
    if (scroll) return;

    iLocks.add(id);

    const { style } = document.body;

    // RTL <body> scrollbar
    const scrollbarX = iScrollbarX();

    const scrollbarWidth = iScrollbarWidth();

    const name = scrollbarX ? 'paddingLeft' : 'paddingRight';

    const scrollY = style.top ? parseFloat(style.top) : window.scrollY;
    const scrollX = style.left ? parseFloat(style.left) : window.scrollX;

    style.overflow = 'hidden';

    if (scrollbarWidth) {
      style[name] = `${scrollbarWidth}px`;
    }

    // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.
    if (isIOS()) {
      // iOS 12 does not support `visualViewport`.
      const { offsetTop = 0, offsetLeft = 0 } = window.visualViewport ?? {};

      Object.assign(style, {
        position: 'fixed',
        top: `${-(scrollY - Math.floor(offsetTop))}px`,
        left: `${-(scrollX - Math.floor(offsetLeft))}px`,
        right: '0',
      });
    }

    return () => {
      iLocks.delete(id);

      if (iLocks.size === 0) {
        Object.assign(style, {
          [name]: '',
          overflow: '',
        });

        if (isIOS()) {
          Object.assign(style, {
            top: '',
            left: '',
            right: '',
            position: '',
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [id, scroll]);

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: 1 }}
      className={classNames(styles.wrap, className)}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      {...rest}
    />
  );
});
