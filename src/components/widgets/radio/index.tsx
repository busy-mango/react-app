import {
  forwardRef,
  Fragment,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';

import { isBigInt } from '@busymango/is-esm';

import { isInputElement } from '@/utils';

import { useControlState } from '../control';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import { ICheckedSVG } from './icon';
import type {
  IRadioInputRender,
  IRadioProps,
  IRadioRef,
  IRadioRender,
  IRadioRootRender,
  IRadioState,
} from './models';

import * as styles from './index.scss';

const iRootRender: IRadioRootRender = ({ label, radio, ...others }) => (
  <span {...others}>
    {radio}
    {label}
  </span>
);

const iRadioRender: IRadioRender = ({ input, ...others }, { checked }) => (
  <ISVGWrap {...others}>
    <ICheckedSVG checked={checked} className={styles.icon} />
    {input}
  </ISVGWrap>
);

const iInputRender: IRadioInputRender = (
  { ref, ...props },
  { checked, disabled, readOnly, value }
) => (
  <Fragment>
    <input
      ref={ref}
      disabled={disabled}
      readOnly={readOnly}
      type="radio"
      value={isBigInt(value) ? value.toLocaleString() : (value ?? undefined)}
      {...props}
      checked={checked ?? false}
    />
    <IWave className={styles.wave} target={ref} />
  </Fragment>
);

const onCatch = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event ?? {};
  if (isInputElement(target)) return target.checked;
};

export const IRadio = forwardRef<IRadioRef, IRadioProps>(
  function Radio(props, iForwardRef) {
    const {
      name,
      label,
      value,
      render,
      checked,
      defaultChecked,
      direction = 'horizontal',
      variant = 'bordered',
      disabled = false,
      readOnly = false,
      size = 'medium',
      id: _id,
      onChange,
      ...others
    } = props;

    const uid = useId();

    const id = _id ?? uid;

    const input = useRef<HTMLInputElement>(null);

    const [iChecked, iChange] = useControlState({
      onCatch,
      onChange,
      value: checked,
      defaultValue: defaultChecked,
    });

    const state: IRadioState = {
      size,
      value,
      variant,
      readOnly,
      disabled,
      direction,
      checked: iChecked,
    };

    useImperativeHandle(
      iForwardRef,
      () => ({
        input: input.current!,
      }),
      [input]
    );

    return (render?.root ?? iRootRender)(
      {
        label: label,
        className: styles.root,
        radio: (render?.radio ?? iRadioRender)(
          {
            className: classNames(styles.radio),
            input: (render?.input ?? iInputRender)(
              {
                id,
                name,
                ref: input,
                className: styles.input,
                onChange: iChange,
                ...others,
              },
              state
            ),
          },
          state
        ),
      },
      state
    );
  }
);

export type {
  IRadioInputRender,
  IRadioProps,
  IRadioRef,
  IRadioRender,
  IRadioRootRender,
} from './models';
