import type { HTMLMotionProps } from 'motion/react';

export interface IFlexProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  vertical?: boolean;
  reverse?: boolean;
  centered?: boolean;
  inline?: boolean;
  gap?: React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  wrap?: React.CSSProperties['flexWrap'] | true;
  align?: React.CSSProperties['alignItems'];
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
}
