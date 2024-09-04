import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { Transition } from 'framer-motion';
import { motion } from 'framer-motion';

import { useControlState } from '../control';
import type {
  ISwitchInputRender,
  ISwitchProps,
  ISwitchRef,
  ISwitchRootRender,
} from './models';

import * as styles from './index.scss';

const spring: Transition = {
  damping: 30,
  type: 'spring',
  stiffness: 700,
};

const isInputElement = (target: unknown): target is HTMLInputElement =>
  target instanceof HTMLInputElement;

const onCatch = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event ?? {};
  if (isInputElement(target)) return target.checked;
};

const iRootRender: ISwitchRootRender = ({ input, icon, label, className }) => (
  <span data-ui-switchroot className={className}>
    <motion.div layout className={styles.label} transition={spring}>
      {label}
    </motion.div>
    <motion.div layout className={styles.handle} transition={spring}>
      {icon}
    </motion.div>
    {input}
  </span>
);

const iInputRender: ISwitchInputRender = (
  { ref, value, ...props },
  { checked, pattren }
) => (
  <input
    ref={ref}
    checked={checked}
    disabled={pattren === 'disabled'}
    readOnly={pattren === 'readOnly' || pattren === 'readPretty'}
    type="checkbox"
    value={value?.toString()}
    {...props}
  />
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
      onCatch,
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
        className: classNames(
          styles.root,
          styles[size],
          iChecked && styles.checked
        ),
        label: render?.label?.({}, states),
        input: (render?.input ?? iInputRender)(
          {
            ref: input,
            ...others,
            onChange: iChange,
            className: classNames(styles.input, className),
          },
          states
        ),
        icon: render?.icon?.({}, states),
      },
      states
    );
  }
);
