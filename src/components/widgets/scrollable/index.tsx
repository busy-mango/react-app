import { useRef } from 'react';
import classNames from 'classnames';

import { isEmptyArray } from '@busymango/is-esm';
import { ifnot, sizeOf } from '@busymango/utils';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

import { iPropagation } from '@/utils';

import { IEmptyWrap } from '../empty';
import { estimateSize } from './helpers';
import type { IScrollableProps } from './models';

import * as styles from './index.scss';

export const IScrollable = <T,>(props: IScrollableProps<T>) => {
  const {
    gap,
    style,
    source,
    maxHeight,
    isLoading,
    className,
    measure = false,
    onClick = iPropagation,
    onScroll,
    render,
    ...others
  } = props;

  const count = sizeOf(source);

  const container = useRef<HTMLDivElement>(null);

  const getScrollElement = () => container.current!;

  const {
    getTotalSize,
    scrollToIndex,
    measureElement,
    getVirtualItems,
    getOffsetForIndex,
  } = useVirtualizer({
    getScrollElement,
    estimateSize,
    overscan: 20,
    count,
    gap,
  });

  const iRender = (item: VirtualItem) => {
    const { key, index, start } = item;
    const transform = `translateY(${start}px)`;
    return (
      <div
        key={key}
        ref={ifnot(measure && measureElement)}
        aria-posinset={index + 1}
        aria-setsize={count}
        className={styles.item}
        data-index={index}
        role="option"
        style={{ transform }}
      >
        {render(source![index], item)}
      </div>
    );
  };

  const items = getVirtualItems();

  return (
    <div
      ref={container}
      className={classNames(styles.scrollable, className)}
      style={{ ...style, maxHeight }}
      onClick={onClick}
      onScroll={onScroll}
      {...others}
    >
      <div style={{ height: getTotalSize() }}>{items.map(iRender)}</div>
      {isEmptyArray(items) && (
        <IEmptyWrap className={styles.empty} isLoading={isLoading} />
      )}
    </div>
  );
};

export type { IScrollableProps } from './models';
