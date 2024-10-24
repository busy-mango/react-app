import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { iArray, ifnot, sizeOf } from '@busymango/utils';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

import { iCompact, iPropagation } from '@/utils';

import { useControlState } from '../control';
import { IEmptyWrap } from '../empty';
import { IFlex } from '../flex';
import { ISignLine } from '../sign';
import { estimateSize } from './helpers';
import type {
  IMenuEmptyRender,
  IMenuOptionRender,
  IMenuProps,
  IMenuRef,
} from './models';

import * as styles from './index.scss';

const iEmptyRender: IMenuEmptyRender = (props) => <IEmptyWrap {...props} />;

const iOptionRender: IMenuOptionRender = (option, { isActive, isSelected }) => (
  <IFlex
    align="center"
    className={classNames(styles.option, {
      [styles.active]: isActive,
      [styles.selected]: isSelected,
    })}
    justify="space-between"
  >
    {option?.label ?? option?.value?.toLocaleString()}
    <AnimatePresence>
      {isSelected && <ISignLine className={styles.tick} type="tick" />}
    </AnimatePresence>
  </IFlex>
);

export const IMenu = forwardRef<IMenuRef, IMenuProps>(
  function IMenu(props, iForwardRef) {
    const {
      value,
      options,
      maxHeight,
      isLoading,
      className,
      isPositioned,
      measure = false,
      multiple = false,
      onClick = iPropagation,
      onSelect,
      onChange,
      onScroll,
      render,
      ...others
    } = props;
    const count = sizeOf(options);

    const container = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState<number>(-1);

    const getScrollElement = () => container.current!;

    const [val, iChange] = useControlState({ value, onChange });

    const iSelectedList = iCompact(iArray(val) ?? []);

    useImperativeHandle(iForwardRef, () => ({
      native: container.current!,
      active: () => {},
      select: () => {},
    }));

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

    const items = getVirtualItems();

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
          data-index={index}
          role="option"
          style={{ transform }}
          onClick={() => {
            iChange(element.value);
            onSelect?.(index, iSelectedList);
          }}
        >
          {(render?.option ?? iOptionRender)(element, {
            isActive,
            isSelected,
            index,
          })}
        </div>
      );
    };

    return (
      <div
        ref={container}
        className={classNames(styles.wrap, className)}
        style={{ maxHeight }}
        onClick={onClick}
        onScroll={onScroll}
        {...others}
      >
        <div style={{ height: getTotalSize() }}>{items.map(iRender)}</div>
      </div>
    );
  }
);

export { estimateSize } from './helpers';
export type { IMenuProps, IMenuRef } from './models';
