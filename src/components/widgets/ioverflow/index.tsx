import { useMemo, useRef } from 'react';
import classNames from 'classnames';

import { isHTMLElement } from '@busymango/is-esm';

import { useMemoFunc, useToggle } from '@/hooks';
import type { ReactCFC, WrapperProps } from '@/models';
import { isOverflow } from '@/utils';

import type { IPopoverRef } from '../ipopover';
import { IPopover } from '../ipopover';

import styles from './index.scss';

export interface IOverflowProps extends WrapperProps {
  /** 气泡窗中的内容 */
  tip?: React.ReactNode;
  /** 气泡窗的弹窗时机 */
  timing?: 'overflow' | 'alway';
  /** 最大行数 */
  maxRow?: number;
  /** 宽度 */
  width?: React.CSSProperties['width'];
  /** 最小宽度 */
  minWidth?: React.CSSProperties['minWidth'];
  /** 最大宽度 */
  maxWidth?: React.CSSProperties['maxWidth'];
}

export const IOverflow: ReactCFC<IOverflowProps> = (props) => {
  const {
    tip,
    style,
    width,
    minWidth,
    maxWidth,
    children,
    className,
    timing = 'overflow',
    maxRow = 1,
    ...others
  } = props;

  const refs = useRef<IPopoverRef>(null);

  const [open, { toggle }] = useToggle();

  const iStyle = useMemo(
    () => ({
      ...style,
      WebkitLineClamp: maxRow,
      minWidth,
      maxWidth,
      width,
    }),
    [style, minWidth, maxWidth, width, maxRow]
  );

  const content = tip ?? children;

  const onChange = useMemoFunc((open: boolean) => {
    const { current } = refs.current?.reference ?? {};
    if (isHTMLElement(current) && timing === 'overflow') {
      toggle(isOverflow(current) ? open : false);
    } else if (timing === 'alway') {
      toggle(open);
    }
  });

  return (
    <IPopover
      ref={refs}
      content={content}
      open={!!content && open}
      render={(props) => (
        <div
          className={classNames(styles.wrap, className)}
          style={iStyle}
          {...others}
          {...props}
        >
          {children}
        </div>
      )}
      trigger={'click'}
      type="tip"
      onOpenChange={onChange}
    />
  );
};
