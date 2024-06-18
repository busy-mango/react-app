import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { isFalse, isNumber, isTrue } from '@busymango/is-esm';
import { dedup, ifnot } from '@busymango/utils';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useMemoFunc } from '@/hooks';
import { iArray, iCompact, sizeOf } from '@/utils';

import { estimateSize } from './helpers';
import type { ScrollableProps, ScrollableRef } from './models';

import styles from './index.scss';

export const Scrollable = forwardRef<ScrollableRef, ScrollableProps>(
  function Scrollable(props, ref) {
    const {
      value,
      options,
      maxHeight,
      isPositioned,
      measure = false,
      multiple = false,
      onChange,
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

    const iRender = ({ key, index, start }: VirtualItem) => {
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
          role="option"
          style={{ transform }}
          onClick={() => {
            iChange(index, isSelected);
          }}
        >
          {render(element, { isActive, isSelected })}
        </div>
      );
    };

    useLayoutEffect(() => {
      if (count && isPositioned && isNumber(active)) {
        scrollToIndex(active, { behavior: 'smooth' });
      }
    }, [scrollToIndex, isPositioned, active, count]);

    return (
      <div
        ref={container}
        className={classNames(styles.scrollable)}
        style={{ maxHeight }}
        {...others}
      >
        <div style={{ height: getTotalSize() }}>
          {getVirtualItems().map(iRender)}
        </div>
      </div>
    );
  }
);
