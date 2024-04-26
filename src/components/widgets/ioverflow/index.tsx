import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import type { WrapperProps } from '@/models';

export interface IOverflowProps extends WrapperProps {
  /** 最大行数 */
  maxRow?: number;
  /** 宽度 */
  width?: React.CSSProperties['width'];
  /** 最小宽度 */
  minWidth?: React.CSSProperties['minWidth'];
  /** 最大宽度 */
  maxWidth?: React.CSSProperties['maxWidth'];
}

export const IOverflow = forwardRef<HTMLDivElement, IOverflowProps>(
  function Overflow(props, ref) {
    const {
      style,
      width,
      minWidth,
      maxWidth,
      children,
      className,
      maxRow = 1,
      ...others
    } = props;

    return (
      <div
        ref={ref}
        className={classNames(className)}
        style={useMemo(
          () => ({
            ...style,
            WebkitLineClamp: maxRow,
            minWidth,
            maxWidth,
            width,
          }),
          [style, minWidth, maxWidth, width, maxRow]
        )}
        {...others}
      >
        {children}
      </div>
    );
  }
);
