import { forwardRef, Fragment } from 'react';
import classNames from 'classnames';
import type { HTMLMotionProps, Target, Transition } from 'framer-motion';
import { motion } from 'framer-motion';

import { size2px } from '@/utils';

import * as styles from './presence.scss';

const animate: Target = { x: 0, opacity: 1 };

const transition: Transition = { duration: 0.1 };

const initial: Target = { opacity: 0, x: -size2px(4) };

export const Presence = forwardRef<
  HTMLSpanElement,
  HTMLMotionProps<'span'> & {
    separator?: React.ReactNode;
  }
>(function Presence({ className, separator, ...others }, ref) {
  return (
    <Fragment>
      {separator}
      <motion.span
        ref={ref}
        animate={animate}
        className={classNames(styles.chip, className)}
        exit={initial}
        initial={initial}
        layout="size"
        transition={transition}
        {...others}
      />
    </Fragment>
  );
});
