import type { HTMLMotionProps, MotionStyle } from 'motion/react';

import type { ReactMotionProps, ReactRender, ReactWrapProps } from '@/models';

export type IFlexState = {
  inline?: boolean;
  reverse?: boolean;
  vertical?: boolean;
  centered?: boolean;
};

type IFlexRender<P> = ReactRender<P, IFlexState>;

export type IFlexRootRender = IFlexRender<
  {
    ref?: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
    style: MotionStyle;
    className: string;
  } & HTMLMotionProps<'div'>
>;

export interface IFlexProps
  extends IFlexState,
    ReactWrapProps,
    ReactMotionProps {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
  gap?: React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  wrap?: React.CSSProperties['flexWrap'] | true;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  direction?: React.CSSProperties['flexDirection'];
  renders?: {
    root?: IFlexRootRender;
  };
}
