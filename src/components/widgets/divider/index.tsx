import { forwardRef } from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';

import type {
  IDividerProps,
  IDividerRootRender,
  IDividerState,
} from './models';

import * as styles from './index.scss';

const iRootRender: IDividerRootRender = (
  { children, ...others },
  { vertical }
) =>
  vertical ? (
    <div aria-hidden="true" role="separator" {...others} />
  ) : children ? (
    <div role="presentation" {...others}>
      <motion.hr layout />
      <motion.span layout className={styles.text}>
        {children}
      </motion.span>
      <motion.hr layout />
    </div>
  ) : (
    <hr aria-hidden="true" role="separator" {...others} />
  );

export const IDivider = forwardRef<HTMLDivElement, IDividerProps>(
  function Divider(props, ref) {
    const {
      className,
      absolute = false,
      vertical = false,
      render,
      // flexItem = false,
      // light = false,
      align = 'center',
      variant = 'fullWidth',
      ...others
    } = props;

    const states: IDividerState = {
      align,
      variant,
      absolute,
      vertical,
    };

    return (render?.root ?? iRootRender)(
      {
        className: classNames(
          vertical ? styles.vertical : styles.horizontal,
          styles[variant],
          styles[align],
          className
        ),
        ...others,
      },
      states
    );
  }
);
