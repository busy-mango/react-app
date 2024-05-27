import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import classNames from 'classnames';

import { assign, ifnot, type OmitOf } from '@busymango/utils';

import type { ControlUIPattern } from '@/components/models';
import {
  useControlPatternAssert,
  useControlState,
  useEventState,
  useMemoFunc,
} from '@/hooks';
import type { ReactInputProps } from '@/models';
import { iPressEvent, isIOS, sizeOf } from '@/utils';

import styles from './index.scss';

type ValueType = ReactInputProps['value'] | null;

export interface IInputRef {
  clear: () => void;
  native: HTMLInputElement | null;
}

export interface IInputProps
  extends OmitOf<ReactInputProps, 'onChange' | 'value'> {
  /** 控件值 */
  value?: ValueType;
  /** 控件交互模式 */
  pattern?: ControlUIPattern;
  /** 输入事件 */
  onChange?: (value?: ValueType) => void;
  /** 回车事件 */
  onPressEnter?: ReactInputProps['onKeyDown'];
}

export const IInput = forwardRef<IInputRef, IInputProps>(
  function Input(props, ref) {
    const {
      style,
      pattern = 'editable',
      onPressEnter,
      onKeyDown,
      ...others
    } = props;

    const target = useRef<HTMLInputElement>(null);

    const assert = useControlPatternAssert(pattern);

    const { isReadOnly, isDisabled, isReadPretty } = assert;

    const [value, onChange] = useControlState(props);

    const isComposition = useEventState({
      target,
      end: 'compositionend',
      start: 'compositionstart',
    });

    const clear = useMemoFunc(() => {
      onChange?.(null);
      // https://github.com/ant-design/ant-design-mobile/issues/5212
      isIOS() && isComposition && target.current?.blur();
    });

    const change = useMemoFunc(
      ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(target.value);
      }
    );

    const width = ifnot(isReadPretty && `${sizeOf(value)}em`);

    useImperativeHandle(ref, () => ({ clear, native: target.current }));

    return (
      <input
        className={classNames(styles.input, styles[pattern])}
        style={useMemo(() => assign(style ?? {}, { width }), [style, width])}
        onClick={props.onClick}
        onKeyDown={iPressEvent(onPressEnter, onKeyDown)}
        {...others}
        disabled={isDisabled}
        readOnly={isReadOnly || isReadPretty}
        value={value ?? ''}
        onChange={change}
      />
    );
  }
);
