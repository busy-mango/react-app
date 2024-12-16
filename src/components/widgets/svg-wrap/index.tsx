import type { HTMLMotionProps, Target, Transition } from 'motion/react';
import { motion } from 'motion/react';

import type { ReactCFC } from '@/models';

export interface ISVGWrapProps extends HTMLMotionProps<'i'> {
  x?: string | number;
  y?: string | number;
}

const transition: Transition = { ease: 'easeOut' };

const iAnimate = ({ x = 0, y = 0 }: Partial<Target>): Target => ({
  opacity: 1,
  scale: 1,
  x,
  y,
});

const iInitial = ({ x = 0, y = 0 }: Partial<Target>): Target => ({
  opacity: 0.36,
  scale: 0.64,
  x,
  y,
});

export const ISVGWrap: ReactCFC<ISVGWrapProps> = (props) => {
  const { x = 0, y = 0, children, className, style, ...others } = props;

  return (
    <motion.i
      animate={iAnimate({ x, y })}
      className={className}
      exit={iInitial({ x, y })}
      initial={iInitial({ x, y })}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        ...style,
      }}
      transition={transition}
      {...others}
    >
      {/* ZWSP(zero-width space) */}
      {'\u200b'}
      {children}
    </motion.i>
  );
};
