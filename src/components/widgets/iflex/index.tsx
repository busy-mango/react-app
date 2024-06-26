import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { isFalse, isTrue } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import type { IFlexProps } from './models';

import styles from './index.scss';

export const IFlex = forwardRef<HTMLDivElement, IFlexProps>(
  function Flex(props, ref) {
    const {
      gap,
      flex,
      wrap,
      align,
      style,
      justify,
      reverse,
      children,
      centered,
      className,
      vertical = false,
      ...others
    } = props;

    const flexWrap = isTrue(wrap) ? 'wrap' : wrap;

    const alignItems = align ?? ifnot(centered && 'center');

    const justifyContent = justify ?? ifnot(centered && 'center');

    return (
      <div
        ref={ref}
        className={classNames(
          styles.wrap,
          reverse && styles.reverse,
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
            gap,
          }),
          [style, flex, alignItems, justifyContent, flexWrap, gap]
        )}
        {...others}
      >
        {children}
      </div>
    );
  }
);

export * from './models';
