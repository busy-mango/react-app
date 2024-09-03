import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { Transition } from 'framer-motion';
import { motion } from 'framer-motion';

import { useControlState } from '../control';
import { ISignLine } from '../sign';
import { ISVGWrap } from '../svg-wrap';
import type {
  ISwitchIconRender,
  ISwitchInputRender,
  ISwitchLabelRender,
  ISwitchProps,
  ISwitchRef,
  ISwitchRootRender,
} from './models';

import * as styles from './index.scss';

const spring: Transition = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

const iRootRender: ISwitchRootRender = ({ input, icon, label, className }) => (
  <span data-ui-switchroot className={className}>
    <motion.div layout className="handle" transition={spring}>
      {icon}
    </motion.div>
    {label}
    {input}
  </span>
);

const iIconRender: ISwitchIconRender = ({ checked, pattren }) => {
  const type = (function () {
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

const iLabelRender: ISwitchLabelRender = ({ children }) => (
  <Fragment>{children}</Fragment>
);

const iInputRender: ISwitchInputRender = (
  { ref, value, ...props },
  { checked }
) => (
  <Fragment>
    <input
      ref={ref}
      checked={checked}
      type="checkbox"
      value={value?.toString()}
      // disabled={pattren === 'disabled'}
      // readOnly={pattren === 'readOnly'}
      {...props}
    />
  </Fragment>
);

export const ISwitch = forwardRef<ISwitchRef, ISwitchProps>(
  function Switch(props, ref) {
    const {
      render,
      checked,
      className,
      defaultChecked,
      pattren = 'editable',
      status = 'success',
      variant = 'solid',
      size = 'medium',
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
      onChange,
      value: checked,
      defaultValue: defaultChecked,
    });

    const states = {
      size,
      status,
      variant,
      pattren,
      checked: iChecked,
    };

    return (render?.root ?? iRootRender)(
      {
        ref: root,
        className: classNames(styles.root, styles[size]),
        label: (render?.label ?? iLabelRender)({}, states),
        input: (render?.input ?? iInputRender)(
          {
            ref: input,
            ...others,
            onChange: iChange,
            className: classNames(styles.input, className),
          },
          states
        ),
        icon: (render?.icon ?? iIconRender)?.({ className: '' }, states),
      },
      states
    );
  }
);
