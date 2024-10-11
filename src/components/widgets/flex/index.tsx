import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { isFalse, isTrue } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import type { IFlexProps } from './models';

import * as styles from './index.scss';

export const IFlex = forwardRef<HTMLDivElement, IFlexProps>(
  function Flex(props, ref) {
    const {
      gap,
      flex,
      wrap,
      align,
      style,
      inline,
      justify,
      reverse,
      children,
      centered,
      className,
      direction,
      vertical = false,
      ...others
    } = props;

    const iRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => iRef.current!, [iRef]);

    const flexWrap = isTrue(wrap) ? 'wrap' : wrap;

    const alignItems = align ?? ifnot(centered && 'center');

    const justifyContent = justify ?? ifnot(centered && 'center');

    return (
      <motion.div
        ref={iRef}
        className={classNames(
          styles.wrap,
          reverse && styles.reverse,
          isTrue(inline) && styles.inline,
          isTrue(vertical) && styles.vertical,
          isFalse(vertical) && styles.horizontal,
          className
        )}
        style={useMemo(
          () => ({
            ...style,
            flex,
            flexWrap,
            alignItems,
            justifyContent,
            flexDirection: direction,
            gap,
          }),
          [style, flex, alignItems, justifyContent, flexWrap, gap, direction]
        )}
        {...others}
      >
        {children}
      </motion.div>
    );
  }
);

export * from './models';
