import type { PropsWithChildren } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

export interface ICardProps
  extends PropsWithChildren,
    OmitOf<HTMLMotionProps<'div'>, 'children' | 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
