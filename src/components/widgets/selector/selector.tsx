import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isArray, isEmpty, isFalse, isNonEmptyString } from '@busymango/is-esm';
import { iArray, ifnot } from '@busymango/utils';
import { FloatingPortal } from '@floating-ui/react';

import { useMemoFunc } from '@/hooks';
import { container } from '@/init';
import { iCompact, isReactNode } from '@/utils';

import { IChip } from '../chip';
import { IControlWrap, useControlState, usePatternAssert } from '../control';
import { IFlex } from '../flex';
import type { IInputRef } from '../input';
import { IInput } from '../input';
import { ISignLine } from '../sign';
import {
  useFilterOptions,
  useIFloating,
  useIInteractions,
  useIMotion,
  useSignType,
} from './hooks';
import type {
  IOptionRender,
  ISelectorProps,
  ISelectorRef,
  ScrollableRef,
} from './models';
import { Presence } from './presence';
import { Scrollable } from './scrollable';

import * as styles from './index.scss';

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
      {params?.isSelected && <ISignLine className={styles.tick} type="tick" />}
    </AnimatePresence>
  </IFlex>
);

export const ISelector = forwardRef<ISelectorRef, ISelectorProps>(
  function ISelector(props, ref) {
    const {
      style,
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
      className,
      placeholder,
      open: _open,
      clear = true,
      filter = true,
      keyword: _keyword,
      iFloatingClassName,
      variant = 'bordered',
      pattern = 'editable',
      size: _size = 'medium',
      onOpenChange: _onOpenChange,
      onSearch: _onSearch,
      iFloatingRoot,
      onFocus,
      onClick,
      onBlur,
    } = props;

    const input = useRef<IInputRef>(null);

    const scrollable = useRef<ScrollableRef>(null);

    const [value, onChange] = useControlState(props);

    const [keyword, onSearch] = useControlState({
      value: _keyword,
      onChange: _onSearch,
    });

    const [open, onOpenChange] = useControlState({
      value: _open,
      onChange: _onOpenChange,
    });

    const assert = usePatternAssert(pattern);

    const iSelectedList = iCompact(iArray(value) ?? []);

    const { isEditable, isReadPretty } = assert;

    const clearable = !isEmpty(value) && isReactNode(clear) && !isFalse(clear);

    const filtered = useFilterOptions(options, { filter, keyword });

    const {
      refs,
      context,
      floatingStyles,
      isPositioned = false,
    } = useIFloating({ open, onOpenChange });

    useImperativeHandle(
      ref,
      () => ({
        input: input.current!,
        floating: refs.floating,
        reference: refs.reference,
      }),
      [refs, input]
    );

    const { transition, initial } = useIMotion(context);

    const iSignType = useSignType(context, { clearable });

    const { getReferenceProps, getFloatingProps } = useIInteractions(context);

    const iChange = useMemoFunc((current?: React.Key | React.Key[]) => {
      input.current?.clear();
      input.current?.native?.focus();
      onChange?.(current ?? undefined);
    });

    const iClick = useMemoFunc((event: React.MouseEvent<HTMLDivElement>) => {
      input.current?.native?.focus();
      onClick?.(event);
    });

    const iSearch = useMemoFunc(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch?.(event.target.value?.toLocaleString());
      }
    );

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

    return (
      <Fragment>
        <IControlWrap
          ref={refs.setReference}
          className={classNames(
            styles.reference,
            styles[pattern],
            {
              [styles.multiple]: multiple,
              // [styles.keyword]: isNonEmptyString(keyword),
            },
            className
          )}
          isLoading={isLoading}
          pattern={pattern}
          prefix={prefix}
          size={_size}
          status={status}
          suffix={!isReadPretty && <ISignLine type={iSignType} />}
          suffixClickable={iSignType === 'cross'}
          variant={variant}
          onSuffixClick={onSuffixClick}
          {...getReferenceProps({ onClick: iClick, style })}
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
              pattern={pattern}
              placeholder={ifnot(isEmpty(iSelectedList) && placeholder)}
              value={keyword}
              onBlur={onBlur}
              onChange={iSearch}
              onFocus={onFocus}
              onKeyDown={iKeyDown}
            />
          </motion.div>
        </IControlWrap>
        <FloatingPortal root={iFloatingRoot?.(refs.reference) ?? container}>
          <AnimatePresence>
            {context.open && isEditable && (
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
                  isLoading={isLoading}
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
