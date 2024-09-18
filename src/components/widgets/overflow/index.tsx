import { useMemo, useRef } from 'react';
import classNames from 'classnames';

import { isHTMLElement } from '@busymango/is-esm';
import { type PartialPick } from '@busymango/utils';

import { useMemoFunc, useToggle } from '@/hooks';
import type { ReactCFC, ReactWrapProps } from '@/models';
import { isOverflow, size2px } from '@/utils';

import type {
  ApplyFloatingStyle,
  IPopoverProps,
  IPopoverRef,
} from '../popover';
import { iFloatingMaxSize, IPopover } from '../popover';

import * as styles from './index.scss';

const iApplyFloatingStyle: ApplyFloatingStyle = (params) => ({
  maxHeight: iFloatingMaxSize(params, 'height'),
  maxWidth: `${Math.max(size2px(128), params.rects.reference.width)}px`,
});

export interface IOverflowProps
  extends ReactWrapProps,
    PartialPick<React.CSSProperties, 'width' | 'minWidth' | 'maxWidth'>,
    PartialPick<IPopoverProps, 'root' | 'onApplyFloatingStyle'> {
  /** 气泡窗中的内容 */
  tip?: React.ReactNode;
  /** 气泡窗的弹窗时机 */
  timing?: 'overflow' | 'alway';
  /** 最大行数 */
  maxRow?: number;
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
      mode="tip"
      open={!!content && open}
      root={root}
      trigger="hover"
      onApplyFloatingStyle={onApplyFloatingStyle}
      onOpenChange={onChange}
    >
      {(props) => (
        <div
          className={classNames(styles.wrap, className)}
          style={iStyle}
          {...others}
          {...props}
        >
          {children}
        </div>
      )}
    </IPopover>
  );
};
