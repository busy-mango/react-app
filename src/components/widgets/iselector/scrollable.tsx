import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { isEmptyArray, isFalse, isNumber, isTrue } from '@busymango/is-esm';
import { dedup, ifnot } from '@busymango/utils';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useMemoFunc } from '@/hooks';
import { iArray, iCompact, sizeOf } from '@/utils';

import EmptySVG from '@/icons/business/empty.svg';

import { IFlex } from '../iflex';
import { IClipSpinner } from '../ispinners';
import { estimateSize } from './helpers';
import type { ScrollableProps, ScrollableRef } from './models';

import styles from './index.scss';

export const Scrollable = forwardRef<ScrollableRef, ScrollableProps>(
  function Scrollable(props, ref) {
    const {
      value,
      options,
      maxHeight,
      isLoading,
      isPositioned,
      measure = false,
      multiple = false,
      onSelect,
      onChange,
      onScroll,
      render,
      ...others
    } = props;

    const count = sizeOf(options);

    const container = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState<number>(0);

    const getScrollElement = () => container.current!;

    const iSelectedList = iCompact(iArray(value) ?? []);

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
    });

    /**
     * 多选回调
     * @param value 选中值
     * @param selected 是否选中
     */
    const onMultipleChange = (value?: React.Key, selected?: boolean) => {
      onChange?.(
        dedup(
          selected
            ? iSelectedList.concat(iCompact([value]))
            : iSelectedList.filter((v) => v !== value)
        )
      );
    };

    const iChange = useMemoFunc(
      (index: number = active, isSelected?: boolean) => {
        setActive(index);
        const { value } = options![index];
        isFalse(multiple) && onChange?.(value);
        const selected = isSelected ?? iSelectedList.includes(value);
        isTrue(multiple) && onMultipleChange?.(value, isFalse(selected));
      }
    );

    useImperativeHandle(
      ref,
      () => ({
        native: container.current!,
        select: iChange,
        active: (recipe) => {
          const next = recipe(active);
          if (next >= 0 && next < count) {
            setActive(recipe(active));
          }
        },
      }),
      [active, container, count, iChange]
    );

    const iRender = ({ key, index, start }: VirtualItem<HTMLDivElement>) => {
      const element = options![index];

      const { value } = element;
      const isActive = active === index;
      const transform = `translateY(${start}px)`;
      const isSelected = iSelectedList.includes(value);

      return (
        <div
          key={key}
          ref={ifnot(measure && measureElement)}
          aria-posinset={index + 1}
          aria-selected={isActive}
          aria-setsize={count}
          className={styles.item}
          data-index={index}
          role="option"
          style={{ transform }}
          onClick={() => {
            iChange(index, isSelected);
            onSelect?.(index, iSelectedList);
          }}
        >
          {render(element, { isActive, isSelected })}
        </div>
      );
    };

    useLayoutEffect(() => {
      if (count && isPositioned && isNumber(active)) {
        const behavior = measure ? 'auto' : 'smooth';
        scrollToIndex(active, { behavior });
      }
    }, [scrollToIndex, isPositioned, active, count, measure]);

    const items = getVirtualItems();

    return (
      <div
        ref={container}
        className={classNames(styles.scrollable)}
        style={{ maxHeight }}
        onScroll={onScroll}
        {...others}
      >
        <div style={{ height: getTotalSize() }}>{items.map(iRender)}</div>
        {isEmptyArray(items) && (
          <IFlex centered vertical className={styles.empty}>
            {isLoading ? (
              <IClipSpinner />
            ) : (
              <Fragment>
                <EmptySVG className={styles.emptyIcon} />
                <span className={styles.emptyText}>暂无数据</span>
              </Fragment>
            )}
          </IFlex>
        )}
      </div>
    );
  }
);
