import { forwardRef } from 'react';
import type { HTMLMotionProps, Target, Transition } from 'framer-motion';
import { motion } from 'framer-motion';

import { size2px } from '@/utils';

const animate: Target = { x: 0, opacity: 1 };

const transition: Transition = { duration: 0.1 };

const initial: Target = { opacity: 0, x: -size2px(4) };

export const Presence = forwardRef<HTMLSpanElement, HTMLMotionProps<'span'>>(
  function Presence(props, ref) {
    return (
      <motion.span
        ref={ref}
        animate={animate}
        exit={initial}
        initial={initial}
        layout="size"
        transition={transition}
        {...props}
      />
    );
  }
);
