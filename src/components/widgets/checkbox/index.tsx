import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { isInputElement } from '@/utils';

import { useControlState } from '../control';
import { IFlex } from '../flex';
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

const iRootRender: ICheckRootRender = ({ label, checkbox, className }) => (
  <span data-ui-checkroot className={className}>
    {checkbox}
    <IFlex centered className={styles.label}>
      {label}
    </IFlex>
  </span>
);

const iCheckboxRender: ICheckBoxRender = ({ className, input, icon }) => (
  <span className={className}>
    {icon}
    {input}
  </span>
);

const iInputRender: ICheckInputRender = (
  { ref, wave, value, ...others },
  {
    size: _size,
    status: _status,
    overlay: _overlay,
    variant: _variant,
    indeterminate,
    pattren,
  }
) => (
  <Fragment>
    {wave && <IWave target={ref} />}
    <input
      ref={ref}
      aria-checked="mixed"
      data-indeterminate={indeterminate}
      disabled={pattren === 'disabled'}
      readOnly={pattren === 'readOnly'}
      type="checkbox"
      value={value?.toLocaleString()}
      {...others}
    />
  </Fragment>
);

const iIconRender: ICheckIconRender = (
  { className },
  { checked, indeterminate }
) => {
  const type = (function () {
    if (indeterminate) return 'minus';
    if (checked) return 'tick';
  })();

  return (
    <ISVGWrap className={className}>
      <ISignLine type={type} />
    </ISVGWrap>
  );
};

const onCatch = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event ?? {};
  if (isInputElement(target)) return target.checked;
};

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
      variant = 'solid',
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
      onCatch,
      onChange,
      value: checked,
      defaultValue: defaultChecked,
    });

    const states = useMemo(
      () => ({
        size,
        label,
        status,
        variant,
        overlay,
        pattren,
        indeterminate,
        checked: iChecked,
      }),
      [iChecked, indeterminate, variant, size, overlay, status, pattren, label]
    );

    return (render?.root ?? iRootRender)(
      {
        ref: root,
        label: label,
        className: classNames(styles.root, styles[size]),
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
