import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { assign, ifnot } from '@busymango/utils';

import {
  iComposingParams,
  useControlPatternAssert,
  useControlState,
  useEventState,
  useMemoFunc,
  useResizeObserver,
} from '@/hooks';
import { iPressEvent, isIOS, sizeOf } from '@/utils';

import { iTextSize } from './helpers';
import type { IInputProps, IInputRef } from './models';

import iStyles from '@/components/widgets/common.scss';
import styles from './index.scss';

export const IInput = forwardRef<IInputRef, IInputProps>(
  function Input(props, ref) {
    const {
      style,
      autoSize,
      className,
      placeholder,
      pattern = 'editable',
      onPressEnter,
      onKeyDown,
      ...others
    } = props;

    const record = useRef<string | null>(null);

    const target = useRef<HTMLInputElement>(null);

    const shadow = useRef<HTMLInputElement>(null);

    const assert = useControlPatternAssert(pattern);

    const { isReadOnly, isDisabled, isReadPretty } = assert;

    const isComposing = useEventState(iComposingParams(target));

    const [value, onChange] = useControlState(props, { isComposing });

    useResizeObserver(shadow, () => {
      const { current: iInput } = target;
      const { current: iShadow } = shadow;

      if (iInput && iShadow) {
        const width = `${iTextSize(iInput, iShadow)}px`;
        if (record.current !== width) iInput.style.width = width;
        if (record.current !== width) record.current = width;
      }
    });

    const clear = useMemoFunc(() => {
      onChange?.(null);
      // https://github.com/ant-design/ant-design-mobile/issues/5212
      isIOS() && isComposing && target.current?.blur();
    });

    const iChange = useMemoFunc(
      ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(target.value);
      }
    );

    const width = ifnot((autoSize || isReadPretty) && `${sizeOf(value)}em`);

    useImperativeHandle(ref, () => ({ clear, native: target.current }), [
      clear,
    ]);

    return (
      <Fragment>
        <input
          ref={target}
          className={classNames(styles.input, styles[pattern], className)}
          style={useMemo(() => assign(style ?? {}, { width }), [style, width])}
          onClick={props.onClick}
          onKeyDown={iPressEvent(onPressEnter, onKeyDown)}
          {...others}
          disabled={isDisabled}
          placeholder={placeholder}
          readOnly={isReadOnly || isReadPretty}
          value={value ?? ''}
          onChange={iChange}
        />
        <span
          ref={shadow}
          aria-hidden
          className={iStyles.shadow}
          style={style}
          tabIndex={-1}
        >
          {value?.toLocaleString() || placeholder}
        </span>
      </Fragment>
    );
  }
);

export * from './models';
