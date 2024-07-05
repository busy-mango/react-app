import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import {
  isArray,
  isEmpty,
  isNonEmptyString,
  isObject,
  isTrue,
} from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useInteractions,
} from '@floating-ui/react';

import type { ControlOptionModel, ControlValue } from '@/components/models';
import {
  iFocusParams,
  useControlState,
  useEventState,
  useMemoFunc,
} from '@/hooks';
import { container } from '@/init';
import { iArray, iCompact } from '@/utils';

import { IChip } from '../ichip';
import { IFlex } from '../iflex';
import { IFieldWrap } from '../iform-field-wrap';
import type { IInputRef } from '../iinput';
import { IInput } from '../iinput';
import { ISignLine } from '../isign';
import { estimateSize } from './helpers';
import { useIFloating, useSignType } from './hooks';
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

const iChipRender: IOptionRender = (option, params) => (
  <Fragment>
    {!params?.multiple && (option?.label ?? option?.value?.toLocaleString())}
    {params?.multiple && (
      <IChip close size="mini" variant="filled" onClose={params?.onClose}>
        {option?.label ?? option?.value?.toLocaleString()}
      </IChip>
    )}
  </Fragment>
);

const iOptionRender: IOptionRender = (option, params) => (
  <IFlex
    align="center"
    className={classNames(styles.option, {
      [styles.active]: params?.isActive,
      [styles.selected]: params?.isSelected,
    })}
    justify="space-between"
  >
    {option?.label ?? option?.value?.toLocaleString()}
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
      status,
      prefix,
      options,
      measure,
      multiple,
      maxHeight,
      autoFocus,
      isLoading,
      separator,
      placeholder,
      open: _open,
      keyword: _keyword,
      iFloatingClassName,
      filter = true,
      variant = 'bordered',
      size: _size = 'medium',
      onOpenChange: _onOpenChange,
      onSearch: _onSearch,
      iFloatingRoot,
      onFocus,
      onClick,
      onBlur,
    } = props;

    const [keyword, onSearch] = useControlState({
      value: _keyword,
      onChange: _onSearch,
    });

    const [open, onOpenChange] = useControlState({
      value: _open,
      onChange: _onOpenChange,
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

    const {
      refs,
      context,
      floatingStyles,
      isPositioned = false,
    } = useIFloating({ open, onOpenChange });

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

    const isFocus = useEventState(
      iFocusParams(refs.reference.current as HTMLDivElement)
    );

    const interactions = useInteractions([click, dismiss]);

    const { getReferenceProps, getFloatingProps } = interactions;

    const [value, onChange] = useControlState(props);

    const iSelectedList = iCompact(iArray(value) ?? []);

    const isTop = context.placement.startsWith('top');

    const clearable = !isEmpty(value);

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
      if (clearable) iChange(undefined);
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
              {(render?.chip ?? iChipRender)(current, params)}
            </Presence>
          </Fragment>
        );
      });

    const iSignType = useSignType(clearable, context.open, isFocus);

    return (
      <Fragment>
        <IFieldWrap
          ref={refs.setReference}
          className={classNames(styles.reference, {
            [styles.multiple]: multiple,
            // [styles.keyword]: isNonEmptyString(keyword),
          })}
          isLoading={isLoading}
          prefix={prefix}
          size={_size}
          status={status}
          suffix={<ISignLine ring={iSignType === 'cross'} type={iSignType} />}
          suffixClickable={iSignType === 'cross'}
          variant={variant}
          onSuffixClick={onSuffixClick}
          {...getReferenceProps({ onClick: iClick })}
        >
          <motion.div className={styles.wrap}>
            {!multiple && isEmpty(keyword) && iChipListRender(iSelectedList)}
            <AnimatePresence presenceAffectsLayout mode="popLayout">
              {multiple && isEmpty(keyword) && iChipListRender(iSelectedList)}
            </AnimatePresence>
            <IInput
              ref={input}
              autoSize
              autoFocus={autoFocus}
              className={styles.input}
              placeholder={ifnot(isEmpty(iSelectedList) && placeholder)}
              value={keyword}
              onBlur={onBlur}
              onChange={iSearch}
              onFocus={onFocus}
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
                  style: floatingStyles,
                  onKeyDown: iArrowKeyDown,
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
