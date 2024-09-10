import { useMemo, useRef } from 'react';
import classNames from 'classnames';

import { isHTMLElement } from '@busymango/is-esm';
import { type PartialPick } from '@busymango/utils';

import { useMemoFunc, useToggle } from '@/hooks';
import type { ReactCFC, WrapperProps } from '@/models';
import { isOverflow } from '@/utils';

import type {
  ApplyFloatingStyle,
  IPopoverProps,
  IPopoverRef,
} from '../popover';
import { IPopover } from '../popover';

import * as styles from './index.scss';

const iApplyFloatingStyle: ApplyFloatingStyle = ({
  elements,
  availableHeight,
}) => ({
  maxHeight: `${availableHeight / 2}px`,
  maxWidth: `${elements.reference.getBoundingClientRect().width}px`,
});

export interface IOverflowProps
  extends WrapperProps<HTMLDivElement>,
    PartialPick<IPopoverProps, 'root' | 'onApplyFloatingStyle'> {
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
    root,
    style,
    width,
    minWidth,
    maxWidth,
    children,
    className,
    maxRow = 1,
    timing = 'overflow',
    onApplyFloatingStyle = iApplyFloatingStyle,
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
      root={root}
      trigger="hover"
      type="tip"
      onApplyFloatingStyle={onApplyFloatingStyle}
      onOpenChange={onChange}
    />
  );
};
