import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { ForwardRefComponent, HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

import { ifnot } from '@busymango/utils';

import type { ITypographyElement, ITypographyProps } from './models';

import * as styles from './index.scss';

export const ITypography = forwardRef<ITypographyElement, ITypographyProps>(
  function ITypography(props, iForwardRef) {
    const {
      color,
      align,
      maxRow = undefined,
      variant = 'inherit',
      className,
      style,
      ...others
    } = props;

    const layoutId = useId();

    const container = useRef<ITypographyElement>(null);

    useImperativeHandle(iForwardRef, () => container.current!);

    const attrs = {
      layoutId,
      className: classNames(styles[variant], className),
      style: {
        WebkitLineClamp: ifnot(maxRow !== Infinity && maxRow),
        textAlign: align,
        ...style,
      } satisfies React.CSSProperties,
    };

    const Component = motion[
      variant === 'inherit' || variant === 'subtitle' || variant === 'body'
        ? 'p'
        : variant
    ] as ForwardRefComponent<
      HTMLDivElement,
      HTMLMotionProps<'p'> & HTMLMotionProps<'h1'>
    >;

    return (
      <Component
        ref={container}
        transition={{ type: 'keyframes' }}
        {...attrs}
        {...others}
      />
    );
  }
);

export type { ITypographyProps } from './models';
