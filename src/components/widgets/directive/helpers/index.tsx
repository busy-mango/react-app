import type { Target, Transition } from 'motion/react';

export const initial: Target = {
  height: 0,
  opacity: 0,
};

export const transition: Transition = {
  height: {
    duration: 0.4,
  },
  opacity: {
    duration: 0.25,
    delay: 0.15,
  },
};

export const animate: Target = {
  opacity: 1,
  height: 'auto',
};
