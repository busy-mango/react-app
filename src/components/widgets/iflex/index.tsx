import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { isFalse, isTrue } from '@busymango/is-esm';

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
      className,
      vertical = false,
      ...others
    } = props;

    return (
      <div
        ref={ref}
        className={classNames(
          styles.wrap,
          gap && styles.gap,
          reverse && styles.reverse,
          isTrue(vertical) && styles.vertical,
          isFalse(vertical) && styles.horizontal,
          className
        )}
        style={useMemo(
          () => ({
            ...style,
            flex,
            justify,
            alignItems: align,
            flexWrap: isTrue(wrap) ? 'wrap' : wrap,
            ['--i-flex-gap-size']: gap,
          }),
          [style, flex, align, justify, wrap, gap]
        )}
        {...others}
      >
        {children}
      </div>
    );
  }
);
