import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import classNames from 'classnames';

import { ifnot } from '@busymango/utils';

import { onCheckCatch, useControlState } from '../control';
import { ISignLine } from '../sign';
import { ISVGWrap } from '../svg-wrap';
import { IWaveWrap } from '../wave';
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
  { pattren, checked, indeterminate }
) => (
  <span data-ui-checkroot {...others}>
    {pattren !== 'readPretty' && checkbox}
    {(pattren !== 'readPretty' || checked || indeterminate) && (
      <span className={styles.text}>{label}</span>
    )}
  </span>
);

const iCheckboxRender: ICheckBoxRender = ({ input, icon, ...others }) => (
  <ISVGWrap {...others}>
    {icon}
    {input}
  </ISVGWrap>
);

const iIconRender: ICheckIconRender = (
  { wave, inputRef, ...others },
  { checked, indeterminate }
) => {
  const type = (function () {
    if (indeterminate) return 'minus';
    if (checked) return 'tick';
  })();

  return (
    <IWaveWrap
      enabled={wave}
      style={{ borderRadius: 'var(--border-radius-10)' }}
      target={inputRef}
    >
      <ISignLine rect {...others} type={type} />
    </IWaveWrap>
  );
};

const iInputRender: ICheckInputRender = (
  { ref, value, onChange, ...others },
  { size: _size, status: _status, indeterminate, checked, pattren }
) => (
  <input
    ref={ref}
    checked={checked ?? false}
    data-indeterminate={indeterminate}
    disabled={pattren === 'disabled'}
    readOnly={pattren === 'readOnly' || pattren === 'readPretty'}
    type="checkbox"
    value={value?.toLocaleString()}
    onChange={ifnot(pattren === 'editable' && onChange)}
    {...others}
  />
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
        pattren,
        indeterminate,
        checked: iChecked,
      }),
      [iChecked, indeterminate, size, status, pattren, label]
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
                ref: input,
                onChange: iChange,
                className: classNames(styles.input, className),
                ...others,
              },
              states
            ),
            icon: (render?.icon ?? iIconRender)(
              {
                wave,
                inputRef: input,
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
