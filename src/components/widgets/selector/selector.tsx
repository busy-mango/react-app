import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isEmpty } from '@busymango/is-esm';
import { compact, iArray, ifnot, omit } from '@busymango/utils';

import { iFocusParams, iHoverParams, useEventState } from '@/hooks';
import { iCompact } from '@/utils';

import { IChip } from '../chip';
import { IControlWrap, onInputCatch, useControlState } from '../control';
import { IFlex } from '../flex';
import { IFloating } from '../floating';
import { IInput } from '../input';
import { ISignLine } from '../sign';
import { IVirtualizer } from '../virtualizer';
import { iSignType } from './helpers';
import {
  useArrowKeyDown,
  useFilterOptions,
  useIFloating,
  useIInteractions,
} from './hooks';
import type {
  ISelectorChipsRender,
  ISelectorOptionRender,
  ISelectorProps,
  ISelectorRef,
  ISelectorRootRender,
  ISelectorSearchRender,
  ISelectorState,
} from './models';
import { Presence } from './presence';

import * as styles from './selector.scss';

const iOptionRender: ISelectorOptionRender = (
  { option, isActive, isSelected, handleChange },
  { multiple }
) => (
  <IFlex
    align="center"
    className={classNames(styles.option, {
      [styles.active]: isActive,
      [styles.selected]: isSelected,
    })}
    justify="space-between"
    onClick={() => {
      const { value } = option;
      if (!multiple) handleChange(value);
      if (multiple && isSelected) {
        handleChange((pre) =>
          compact(iArray(pre)).filter((val) => val === value)
        );
      }
      if (multiple && !isSelected) {
        handleChange((pre) => compact(iArray(pre)).concat([value]));
      }
    }}
  >
    {option?.label ?? option?.value?.toLocaleString()}
    <AnimatePresence>
      {isSelected && <ISignLine className={styles.tick} type="tick" />}
    </AnimatePresence>
  </IFlex>
);

const iSearchRender: ISelectorSearchRender = (props, { pattern }) => (
  <IInput width="auto" {...props} pattern={pattern} />
);

const iChipListRender: ISelectorChipsRender = (
  { values, options, separator, handleChange },
  { multiple }
) =>
  values?.map((inner, index) => {
    const option = options?.find(({ value }) => value === inner);
    return (
      <Fragment key={inner.toLocaleString()}>
        {index !== 0 && separator}
        <Presence className={styles.chip}>
          {!multiple && (option?.label ?? option?.value?.toLocaleString())}
          {multiple && (
            <IChip
              closeable
              size="mini"
              variant="filled"
              onClose={() => {
                handleChange(values.filter((v) => v !== inner));
              }}
            >
              {option?.label ?? option?.value?.toLocaleString()}
            </IChip>
          )}
        </Presence>
      </Fragment>
    );
  });

const iRootRender: ISelectorRootRender = (
  { ref, handleChange, chips, search, prefix, suffix, ...others },
  {
    clearable,
    isLoading,
    pattern,
    size,
    status,
    multiple,
    variant,
    keyword,
    isFocus,
    isHover,
    value,
    open,
  }
) => (
  <IControlWrap
    ref={ref}
    isFocusWithin={open}
    isLoading={isLoading}
    isSuffixClickable={
      iSignType({
        clearable: clearable,
        isFocus,
        isHover,
        value,
        open,
      }) === 'cross'
    }
    pattern={pattern}
    prefix={prefix}
    size={size}
    status={status}
    suffix={pattern !== 'readPretty' && suffix}
    variant={variant}
    onSuffixClick={() => {
      clearable && handleChange?.(undefined);
    }}
    {...others}
  >
    <motion.div className={styles.wrap}>
      {!multiple && isEmpty(keyword) && chips}
      <AnimatePresence presenceAffectsLayout mode="popLayout">
        {multiple && chips}
      </AnimatePresence>
      {search}
    </motion.div>
  </IControlWrap>
);

export const ISelector = forwardRef<ISelectorRef, ISelectorProps>(
  function ISelector(props, ref) {
    const {
      style,
      render,
      status,
      prefix,
      options,
      multiple,
      autoFocus,
      isLoading,
      separator,
      className,
      placeholder,
      open: iOpen,
      filter = true,
      clearable = true,
      keyword: word,
      iFloatingClassName,
      variant = 'bordered',
      pattern = 'editable',
      size: _size = 'medium',
      onOpenChange: iOpenChange,
      onSearch,
      iFloatingRoot,
      onFocus,
      onClick,
      onBlur,
    } = props;

    const input = useRef<HTMLInputElement>(null);

    const [active, setActive] = useState<number>();

    const [value, handleChange] = useControlState(props);

    const [keyword, handleSearch] = useControlState({
      value: word,
      onChange: onSearch,
      onCatch: onInputCatch,
    });

    const [open, onOpenChange] = useControlState({
      value: iOpen,
      onChange: iOpenChange,
    });

    const iSelectedList = iCompact(iArray(value) ?? []);

    const { refs, context, floatingStyles } = useIFloating({
      open,
      onOpenChange,
    });

    const { getReferenceProps, getFloatingProps } = useIInteractions(context);

    const current = refs.reference.current as HTMLDivElement;

    const isFocus = useEventState(iFocusParams(current));

    const isHover = useEventState(iHoverParams(current));

    useImperativeHandle(
      ref,
      () => ({
        input: input.current,
        floating: refs.floating,
        reference: refs.reference,
      }),
      [refs, input]
    );

    const filtered = useFilterOptions(options, { filter, keyword });

    const handleArrowKeyDown = useArrowKeyDown({
      active,
      multiple,
      options: filtered,
      values: iSelectedList,
      onChange: handleChange,
      setActive,
    });

    const states: ISelectorState = {
      open: context.open,
      size: _size,
      clearable,
      isLoading,
      isFocus,
      isHover,
      keyword,
      multiple,
      variant,
      pattern,
      prefix,
      status,
      value,
    };

    return (
      <Fragment>
        {(render?.root ?? iRootRender)(
          {
            style,
            prefix,
            handleChange,
            ref: refs.setReference,
            chips: iChipListRender(
              {
                options,
                separator,
                handleChange,
                values: iSelectedList,
              },
              states
            ),
            search: (render?.search ?? iSearchRender)(
              {
                ref: input,
                autoFocus,
                value: keyword,
                className: styles.search,
                placeholder: ifnot(isEmpty(iSelectedList) && placeholder),
                onChange: handleSearch,
                onKeyDown: handleArrowKeyDown,
                onFocus,
                onBlur,
              },
              states
            ),
            className: classNames(
              styles.reference,
              styles[pattern],
              { [styles.multiple]: multiple },
              className
            ),
            suffix: <ISignLine type={iSignType(states)} />,
            ...getReferenceProps({
              onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                input.current?.focus();
                onClick?.(event);
              },
            }),
          },
          states
        )}
        {pattern === 'editable' && (
          <IFloating
            context={context}
            portal={{ root: iFloatingRoot?.(refs.reference) }}
            style={floatingStyles}
            onKeyDown={handleArrowKeyDown}
            {...getFloatingProps()}
            className={classNames(styles.floating, iFloatingClassName)}
          >
            <IVirtualizer
              data={filtered}
              estimateSize={() => 32}
              render={(item, { Container }) => {
                const { index } = item;
                const option = filtered![index];
                const isActive = active === index;
                const isSelected = iSelectedList.includes(option.value);
                return (
                  <Container {...omit(item, ['key'])}>
                    {(render?.option ?? iOptionRender)(
                      {
                        index,
                        option,
                        isActive,
                        isSelected,
                        handleChange,
                        className: classNames(styles.option, {
                          [styles.active]: isActive,
                          [styles.selected]: isSelected,
                        }),
                      },
                      states
                    )}
                  </Container>
                );
              }}
            />
          </IFloating>
        )}
      </Fragment>
    );
  }
);
