import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';

import { iComposingParams, useEventState } from '@/hooks';
import { iPressEvent } from '@/utils';

import { onInputCatch, useControlState, usePatternAssert } from '../control';
import { useWidth } from './hooks';
import type { IInputProps } from './models';

import * as iStyles from '@/styles/widgets.scss';
import * as styles from './index.scss';

export const IInput = forwardRef<HTMLInputElement, IInputProps>(
  function Input(props, ref) {
    const {
      style,
      width,
      className,
      placeholder,
      defaultValue,
      value: iValue,
      pattern = 'editable',
      onChange,
      onPressEnter,
      onKeyDown,
      ...others
    } = props;

    const assert = usePatternAssert(pattern);

    const target = useRef<HTMLInputElement>(null);

    const shadow = useRef<HTMLInputElement>(null);

    const { isReadOnly, isDisabled, isReadPretty } = assert;

    const iWidth = useWidth({
      width,
      shadow,
      target,
      isReadPretty,
    });

    const isComposing = useEventState(iComposingParams(target));

    const [value, handler] = useControlState(
      {
        defaultValue,
        value: iValue,
        onCatch: onInputCatch,
        onChange,
      },
      { isComposing }
    );

    useImperativeHandle(ref, () => target.current!, [target]);

    return (
      <Fragment>
        <input
          ref={target}
          className={classNames(
            styles.input,
            styles[pattern],
            {
              [styles.consistent]: iWidth === 'default',
            },
            className
          )}
          style={{ width: iWidth, ...style }}
          onClick={props.onClick}
          onKeyDown={iPressEvent(onPressEnter, onKeyDown)}
          {...others}
          disabled={isDisabled}
          placeholder={placeholder}
          readOnly={isReadOnly || isReadPretty}
          value={value ?? ''}
          onChange={handler}
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
