import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isEmpty, isNonEmptyString } from '@busymango/is-esm';
import { iArray, ifnot } from '@busymango/utils';
import { FloatingPortal } from '@floating-ui/react';

import {
  iFocusParams,
  iHoverParams,
  useEventState,
  useMemoFunc,
} from '@/hooks';
import { container } from '@/init';
import { iCompact } from '@/utils';

import { IChip } from '../chip';
import { IControlWrap, useControlState } from '../control';
import { IFlex } from '../flex';
import type { IInputRef } from '../input';
import { IInput } from '../input';
import type { ScrollableRef } from '../scrollable';
import { Scrollable } from '../scrollable';
import type { IScrollableEmptyRender } from '../scrollable/models';
import { ISignLine } from '../sign';
import { iSignType } from './helpers';
import {
  useFilterOptions,
  useIFloating,
  useIInteractions,
  useIMotion,
} from './hooks';
import type {
  ISelectorChipRender,
  ISelectorOptionRender,
  ISelectorProps,
  ISelectorRef,
  ISelectorRootRender,
  ISelectorScrollableRender,
  ISelectorSearchRender,
  ISelectorState,
} from './models';
import { Presence } from './presence';

import * as styles from './selector.scss';

const iChipRender: ISelectorChipRender = (
  { option, onClose },
  { multiple }
) => (
  <Fragment>
    {!multiple && (option?.label ?? option?.value?.toLocaleString())}
    {multiple && (
      <IChip close size="mini" variant="filled" onClose={onClose}>
        {option?.label ?? option?.value?.toLocaleString()}
      </IChip>
    )}
  </Fragment>
);

const iOptionRender: ISelectorOptionRender = ({
  option,
  isActive,
  isSelected,
}) => (
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

const iScrollableRender: ISelectorScrollableRender = (props) => (
  <Scrollable {...props} />
);

const iSearchRender: ISelectorSearchRender = (props, { pattern }) => (
  <IInput autoSize className={styles.input} {...props} pattern={pattern} />
);

const iRootRender: ISelectorRootRender = (
  { ref, onChange, chips, search, prefix, suffix, ...others },
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
    isLoading={isLoading}
    pattern={pattern}
    prefix={prefix}
    size={size}
    status={status}
    suffix={pattern !== 'readPretty' && suffix}
    suffixClickable={
      iSignType({
        clearable: clearable && isEmpty(value),
        isFocus,
        isHover,
        open,
      }) === 'cross'
    }
    variant={variant}
    onSuffixClick={() => {
      clearable && onChange?.(undefined);
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
      measure,
      multiple,
      maxHeight,
      autoFocus,
      isLoading,
      separator,
      className,
      placeholder,
      open: _open,
      filter = true,
      clearable = true,
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

    const iSelectedList = iCompact(iArray(value) ?? []);

    const filtered = useFilterOptions(options, { filter, keyword });

    const {
      refs,
      context,
      floatingStyles,
      isPositioned = false,
    } = useIFloating({ open, onOpenChange });

    const current = refs.reference.current as HTMLDivElement;

    const isFocus = useEventState(iFocusParams(current));

    const isHover = useEventState(iHoverParams(current));

    useImperativeHandle(
      ref,
      () => ({
        input: input.current?.native,
        floating: refs.floating,
        reference: refs.reference,
      }),
      [refs, input]
    );

    const { transition, initial } = useIMotion(context);

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

    const states: ISelectorState = {
      clearable,
      isFocus,
      isHover,
      isLoading,
      keyword,
      multiple,
      pattern,
      prefix,
      status,
      size: _size,
      variant,
      value,
    };

    const iEmptyRender: IScrollableEmptyRender = (props) => {
      return render?.empty!(props, states);
    };

    const iChipListRender = (inners?: React.Key[]) =>
      inners?.map((inner, index) => {
        const onClose = () => {
          iChange?.(inners.filter((v) => v !== inner));
        };
        const option = options?.find(({ value }) => value === inner);
        return (
          <Fragment key={inner.toLocaleString()}>
            {index !== 0 && separator}
            <Presence className={styles.chip}>
              {(render?.chip ?? iChipRender)({ option, onClose }, states)}
            </Presence>
          </Fragment>
        );
      });

    return (
      <Fragment>
        {(render?.root ?? iRootRender)(
          {
            prefix,
            onChange: iChange,
            ref: refs.setReference,
            chips: iChipListRender(iSelectedList),
            search: (render?.search ?? iSearchRender)(
              {
                ref: input,
                autoFocus,
                value: keyword,
                className: styles.input,
                placeholder: ifnot(isEmpty(iSelectedList) && placeholder),
                onChange: iSearch,
                onKeyDown: iKeyDown,
                onFocus,
                onBlur,
              },
              states
            ),
            className: classNames(
              styles.reference,
              styles[pattern],
              {
                [styles.multiple]: multiple,
              },
              className
            ),
            suffix: <ISignLine type={iSignType(states)} />,
            ...getReferenceProps({ onClick: iClick, style }),
          },
          states
        )}
        <FloatingPortal root={iFloatingRoot?.(refs.reference) ?? container}>
          <AnimatePresence>
            {context.open && pattern === 'editable' && (
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
                {(render?.scrollable ?? iScrollableRender)(
                  {
                    value,
                    isLoading,
                    isPositioned,
                    maxHeight,
                    measure,
                    multiple,
                    ref: scrollable,
                    options: filtered,
                    className: styles.scrollable,
                    render: {
                      empty: ifnot(render?.empty && iEmptyRender),
                      option: (option, { isActive, isSelected, index }) =>
                        (render?.option ?? iOptionRender)(
                          {
                            option,
                            className: classNames(styles.option, {
                              [styles.active]: isActive,
                              [styles.selected]: isSelected,
                            }),
                            index,
                            isActive,
                            isSelected,
                          },
                          states
                        ),
                    },
                    onChange: iChange,
                  },
                  states
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </Fragment>
    );
  }
);
