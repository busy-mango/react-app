import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import {
  isArray,
  isEmpty,
  isNil,
  isNonEmptyString,
  isObject,
  isTrue,
} from '@busymango/is-esm';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import type { ControlOptionModel, ControlValue } from '@/components/models';
import {
  iHoverParams,
  useControlState,
  useEventState,
  useMemoFunc,
} from '@/hooks';
import { container } from '@/init';
import { iArray, iCompact, size2px } from '@/utils';

import { IArrow } from '../iarrow';
import { IChip } from '../ichip';
import { IFlex } from '../iflex';
import { IFieldWrap } from '../iform-field-wrap';
import type { IInputRef } from '../iinput';
import { IInput } from '../iinput';
import { ISignLine } from '../isign';
import { estimateSize } from './helpers';
import type {
  IOptionRender,
  ISelectorPredicate,
  ISelectorProps,
  ISelectorRef,
  ScrollableRef,
} from './models';
import { Presence } from './presence';
import { Scrollable } from './scrollable';

import styles from './index.scss';

const iChipRender: IOptionRender = ({ value, label }, params) => (
  <Fragment>
    {!params?.multiple && (label ?? value?.toLocaleString())}
    {params?.multiple && (
      <IChip close size="mini" variant="filled" onClose={params?.onClose}>
        {label ?? value?.toLocaleString()}
      </IChip>
    )}
  </Fragment>
);

const iOptionRender: IOptionRender = ({ value, label }, params) => (
  <IFlex
    align="center"
    className={classNames(styles.option, {
      [styles.active]: params?.isActive,
      [styles.selected]: params?.isSelected,
    })}
    justify="space-between"
  >
    {label ?? value?.toLocaleString()}
    <AnimatePresence>
      {params?.isSelected && <ISignLine type="tick" />}
    </AnimatePresence>
  </IFlex>
);

export const ISelector = forwardRef<ISelectorRef, ISelectorProps>(
  function ISelector(props, ref) {
    const {
      clear,
      render,
      options,
      measure,
      multiple,
      maxHeight,
      autoFocus,
      isLoading,
      separator,
      iFloatingClassName,
      open: _open,
      keyword: _keyword,
      filter = true,
      onOpenChange: _onOpenChange,
      onSearch: _onSearch,
      iFloatingRoot,
      onClick,
    } = props;

    const [open, onOpenChange] = useControlState({
      value: _open,
      onChange: _onOpenChange,
    });

    const [keyword, onSearch] = useControlState({
      value: _keyword,
      onChange: _onSearch,
    });

    const predicate = useMemo<ISelectorPredicate | undefined>(() => {
      if (isObject(filter)) {
        return filter?.predicate;
      }
      if (isTrue(filter)) {
        return ({ title }: ControlOptionModel, keyword?: string) => {
          return !keyword ? true : title?.includes(keyword) ?? false;
        };
      }
    }, [filter]);

    const input = useRef<IInputRef>(null);

    const scrollable = useRef<ScrollableRef>(null);

    const [width, setWidth] = useState<number>();

    const apply = useMemoFunc(
      ({ availableWidth }: { availableWidth: number }) => {
        flushSync(() => setWidth(availableWidth));
      }
    );

    const {
      refs,
      context,
      floatingStyles,
      isPositioned = false,
    } = useFloating<HTMLDivElement>({
      open,
      transform: false,
      placement: 'bottom',
      middleware: [
        offset(size2px(2)),
        flip({ padding: size2px(2) }),
        size({ apply }),
      ],
      onOpenChange,
      whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => ({
      floating: refs.floating,
      reference: refs.reference,
    }));

    const click = useClick(context, {
      toggle: false,
    });

    const dismiss = useDismiss(context, {
      referencePressEvent: 'click',
      referencePress: false,
    });

    const isHover = useEventState(
      iHoverParams(refs.reference.current as HTMLDivElement)
    );

    const interactions = useInteractions([click, dismiss]);

    const { getReferenceProps, getFloatingProps } = interactions;

    const [value, onChange] = useControlState(props);

    const iSelectedList = iCompact(iArray(value) ?? []);

    const isTop = context.placement.startsWith('top');

    const transition = useMemo(
      () => ({
        duration: 0.15,
        ease: 'easeOut',
        originY: isTop ? 1 : 0,
      }),
      [isTop]
    );

    const initial = useMemo(
      () => ({
        opacity: 0,
        scaleY: 0.96,
        y: (isTop ? 0.25 : -0.25) * estimateSize(),
      }),
      [isTop]
    );

    const iChange = useMemoFunc((current?: React.Key | React.Key[]) => {
      input.current?.clear();
      input.current?.native?.focus();
      onChange?.(current ?? undefined);
    });

    const iClick = useMemoFunc((event: React.MouseEvent<HTMLDivElement>) => {
      input.current?.native?.focus();
      onClick?.(event);
    });

    const iSearch = useMemoFunc((value: ControlValue) => {
      onSearch(value?.toLocaleString());
    });

    const iArrowKeyDown = useMemoFunc(
      ({ code }: React.KeyboardEvent<HTMLInputElement>) => {
        const { active, select } = scrollable.current ?? {};
        switch (code) {
          case 'Enter':
            select?.();
            break;
          case 'ArrowDown':
            active?.((current) => current + 1);
            break;
          case 'ArrowUp':
            active?.((current) => current - 1);
            break;
          default:
            break;
        }
      }
    );

    const iKeyDown = useMemoFunc(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        iArrowKeyDown(event);
        event.stopPropagation();
        if (multiple && !isNonEmptyString(keyword)) {
          if (event.code === 'Backspace') {
            iChange(iSelectedList.slice(0, -1));
          }
        }
      }
    );

    const onSuffixClick = useMemoFunc(() => {
      if (clearable) {
        input.current?.clear();
        iChange(undefined);
      }
    });

    const filtered = useMemo(() => {
      if (predicate) {
        return options?.filter((option) => {
          return predicate(option, keyword);
        });
      }
      return options;
    }, [predicate, keyword, options]);

    const iChipListRender = (inners?: React.Key[]) =>
      isArray(options) &&
      inners?.map((inner, index) => {
        const onClose = () => {
          iChange?.(iSelectedList.filter((v) => v !== inner));
        };
        const current = options.find(({ value }) => value === inner);
        const params = { multiple, onClose };
        return (
          <Fragment key={inner.toLocaleString()}>
            {index !== 0 && separator}
            <Presence className={styles.chip}>
              {isNil(current) && inner.toLocaleString()}
              {current && (render?.chip ?? iChipRender)(current, params)}
            </Presence>
          </Fragment>
        );
      });

    const iArrowType = context.open ? 'top' : 'bottom';

    const clearable = isHover && !isEmpty(value);

    return (
      <Fragment>
        <IFieldWrap
          ref={refs.setReference}
          className={classNames(styles.reference, {
            [styles.multiple]: multiple,
            [styles.keyword]: isNonEmptyString(keyword),
          })}
          isLoading={isLoading}
          suffix={
            clearable ? (
              <ISignLine ring type="cross" />
            ) : (
              <IArrow type={iArrowType} />
            )
          }
          variant="bordered"
          onSuffixClick={onSuffixClick}
          {...getReferenceProps({
            onClick: iClick,
          })}
        >
          <motion.div className={styles.wrap}>
            <AnimatePresence presenceAffectsLayout mode="popLayout">
              {iChipListRender(iSelectedList)}
            </AnimatePresence>
            <IInput
              ref={input}
              autoSize
              autoFocus={autoFocus}
              className={styles.input}
              value={keyword}
              onChange={iSearch}
              onKeyDown={iKeyDown}
            />
          </motion.div>
        </IFieldWrap>
        <FloatingPortal root={iFloatingRoot?.(refs.reference) ?? container}>
          <AnimatePresence>
            {context.open && (
              <motion.div
                ref={refs.setFloating}
                animate={{
                  y: 0,
                  scaleY: 1,
                  opacity: 1,
                }}
                exit={initial}
                initial={initial}
                transition={transition}
                {...getFloatingProps({
                  onKeyDown: iArrowKeyDown,
                  style: { ...floatingStyles, width },
                  className: classNames(styles.floating, iFloatingClassName),
                })}
              >
                <Scrollable
                  ref={scrollable}
                  isPositioned={isPositioned}
                  maxHeight={maxHeight}
                  measure={measure}
                  multiple={multiple}
                  options={filtered}
                  render={render?.option ?? iOptionRender}
                  value={value}
                  onChange={iChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </Fragment>
    );
  }
);
