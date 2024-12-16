import type { PropsWithChildren } from 'react';
import type { HTMLMotionProps } from 'motion/react';

import type { OmitOf } from '@busymango/utils';

import type { ReactRender } from '@/models';

export interface ICardState {}

export type ICardRootRender = ReactRender<
  HTMLMotionProps<'div'> & {
    ref: React.RefObject<HTMLDivElement | null>;
    header: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
  },
  ICardState
>;

export type ICardRenders = {
  root?: ICardRootRender;
};

export interface ICardProps
  extends PropsWithChildren,
    OmitOf<HTMLMotionProps<'div'>, 'children' | 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'filled' | 'bordered';
  render?: ICardRenders;
}
