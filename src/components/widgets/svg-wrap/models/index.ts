import type {
  AnimationControls,
  HTMLMotionProps,
  TargetAndTransition,
} from 'motion/react';

export type ISVGWrapAnimateModel = TargetAndTransition | AnimationControls;

export interface ISVGWrapProps extends HTMLMotionProps<'i'> {
  x?: string | number;
  y?: string | number;
  animate?: ISVGWrapAnimateModel;
}
