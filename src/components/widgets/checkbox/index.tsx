import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { onCheckCatch, useControlState } from '../control';
import { ISignLine } from '../sign';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import type {
  ICheckboxProps,
  ICheckboxRef,
  ICheckBoxRender,
  ICheckIconRender,
  ICheckInputRender,
  ICheckRootRender,
} from './models';

import * as styles from './index.scss';

const iRootRender: ICheckRootRender = (
  { label, checkbox, ...others },
  { pattren }
) => (
  <span data-ui-checkroot {...others}>
    {pattren !== 'readPretty' && checkbox}
    <span className={styles.text}>{label}</span>
  </span>
);

const iCheckboxRender: ICheckBoxRender = ({ input, icon, ...others }) => (
  <ISVGWrap {...others}>
    {icon}
    {input}
  </ISVGWrap>
);

const iIconRender: ICheckIconRender = (props, { checked, indeterminate }) => {
  const type = (function () {
    if (indeterminate) return 'minus';
    if (checked) return 'tick';
  })();

  return <ISignLine rect {...props} type={type} />;
};

const iInputRender: ICheckInputRender = (
  { ref, wave, value, ...others },
  {
    size: _size,
    status: _status,
    overlay: _overlay,
    indeterminate,
    checked,
    pattren,
  }
) => (
  <Fragment>
    {wave && <IWave measure={ref} target={ref} />}
    <input
      ref={ref}
      data-indeterminate={indeterminate}
      disabled={pattren === 'disabled'}
      readOnly={pattren === 'readOnly'}
      type="checkbox"
      value={value?.toLocaleString()}
      {...others}
      checked={checked ?? false}
    />
  </Fragment>
);

export const ICheckbox = forwardRef<ICheckboxRef, ICheckboxProps>(
  function Checkbox(props, ref) {
    const {
      label,
      render,
      checked,
      className,
      defaultChecked,
      indeterminate = false,
      pattren = 'editable',
      status = 'success',
      size = 'medium',
      overlay = false,
      wave = true,
      onChange,
      ...others
    } = props;

    const root = useRef<HTMLDivElement>(null);

    const input = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      root: root.current ?? undefined,
      input: input.current ?? undefined,
    }));

    const [iChecked = false, iChange] = useControlState({
      value: checked,
      defaultValue: defaultChecked,
      onCatch: onCheckCatch,
      onChange,
    });

    const states = useMemo(
      () => ({
        size,
        label,
        status,
        overlay,
        pattren,
        indeterminate,
        checked: iChecked,
      }),
      [iChecked, indeterminate, size, overlay, status, pattren, label]
    );

    return (render?.root ?? iRootRender)(
      {
        ref: root,
        label: label,
        className: classNames(styles.root, styles[size], styles[pattren], {
          [styles.checked]: iChecked && !indeterminate,
          [styles.indeterminate]: indeterminate,
        }),
        checkbox: (render?.checkbox ?? iCheckboxRender)(
          {
            className: styles.checkbox,
            input: (render?.input ?? iInputRender)(
              {
                wave,
                ref: input,
                onChange: iChange,
                className: classNames(styles.input, className),
                ...others,
              },
              states
            ),
            icon: (render?.icon ?? iIconRender)(
              {
                className: classNames(styles.icon, {
                  [styles.checked]: checked,
                }),
              },
              states
            ),
          },
          states
        ),
      },
      states
    );
  }
);

export type {
  ICheckboxProps,
  ICheckBoxRender,
  ICheckIconRender,
} from './models';
