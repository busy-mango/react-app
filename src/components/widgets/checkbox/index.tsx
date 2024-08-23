import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useControlState } from '@/hooks';

import { IFlex } from '../iflex';
import { ISignLine } from '../isign';
import { ISVGWrap } from '../isvg-wrap';
import { IWave } from '../iwave';
import type {
  CheckboxRef,
  CheckInputRender,
  CheckRootRender,
  ICheckboxProps,
  ICheckBoxRender,
  IconRender,
} from './models';

import styles from './index.scss';

const iIconRender: IconRender = ({ checked, pattren, indeterminate }) => {
  const type = (function () {
    if (indeterminate) return 'minus';
    if (checked) return 'tick';
  })();

  return (
    <ISVGWrap
      className={classNames(styles.icon, {
        [styles.checked]: checked,
      })}
    >
      <ISignLine type={type} />
    </ISVGWrap>
  );
};

const iRootRender: CheckRootRender = ({ label, checkbox, className }) => (
  <span className={className}>
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

const iInputRender: CheckInputRender = ({
  ref,
  wave,
  size: _size,
  status: _status,
  overlay: _overlay,
  variant: _variant,
  indeterminate,
  pattren,
  onChange,
  ...others
}) => (
  <Fragment>
    {wave && <IWave target={ref} />}
    <input
      ref={ref}
      aria-checked="mixed"
      data-indeterminate={indeterminate}
      disabled={pattren === 'disabled'}
      readOnly={pattren === 'readOnly'}
      type="checkbox"
      onChange={({ target }) => {
        onChange?.(target.checked);
      }}
      {...others}
    />
  </Fragment>
);

export const ICheckbox = forwardRef<CheckboxRef, ICheckboxProps>(
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
      icon,
      ...others
    } = props;

    const root = useRef<HTMLDivElement>(null);

    const input = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      root: root.current ?? undefined,
      input: input.current ?? undefined,
    }));

    const [iChecked = false, iChange] = useControlState({
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

    if ((1).toString() === '1') {
      return <input type="checkbox" {...others} />;
    }

    return (render?.root ?? iRootRender)({
      ref: root,
      ...states,
      className: classNames(styles.root),
      checkbox: (render?.checkbox ?? iCheckboxRender)({
        ...states,
        className: styles.checkbox,
        input: (render?.input ?? iInputRender)({
          wave,
          ...others,
          ...states,
          ref: input,
          onChange: iChange,
          className: classNames(styles.input, className),
        }),
        icon: (icon ?? iIconRender)(states),
      }),
    });
  }
);

export type { ICheckboxProps, ICheckBoxRender, IconRender } from './models';
