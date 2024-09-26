import type { Target, Transition } from 'framer-motion';

import { size2px } from '@/utils';

export const animate: Target = { x: 0, opacity: 1 };

export const transition: Transition = { duration: 0.1 };

export const initial: Target = { opacity: 0, x: -size2px(4) };
