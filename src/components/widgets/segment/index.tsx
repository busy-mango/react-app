import { Fragment } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { iPressEvent, iThemeVariable } from '@/utils';

import { useControlState } from '../control';
import { IFlex } from '../flex';
import { ISVGWrap } from '../svg-wrap';
import type {
  ISegmentItemRender,
  ISegmentProps,
  ISegmentRootRender,
  ISegmentState,
} from './models';

import * as styles from './index.scss';

const iRootRender: ISegmentRootRender = ({ segments, ...others }) => (
  <IFlex layout {...others}>
    {segments}
  </IFlex>
);

const iItemRender: ISegmentItemRender = (
  { label, icon, value, disabled, onChange, onKeyDown, onClick, ...others },
  state
) => (
  <button
    {...others}
    tabIndex={0}
    onClick={(event) => {
      onClick?.(event);
      !disabled && onChange(value);
    }}
    onKeyDown={iPressEvent(() => {
      !disabled && onChange(value);
    }, onKeyDown)}
  >
    <AnimatePresence>
      {icon && <ISVGWrap className={styles.icon}>{icon}</ISVGWrap>}
    </AnimatePresence>
    {label}
    <AnimatePresence>
      {state.value === value && !disabled && (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.thumb}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          layoutId="arrow"
        />
      )}
    </AnimatePresence>
  </button>
);

export const ISegment: React.FC<ISegmentProps> = (props) => {
  const {
    options,
    className,
    isFullWidth,
    defaultValue,
    value: _value,
    size = 'medium',
    gap = iThemeVariable('--gap-02'),
    onChange: _onChange,
    render,
    ...others
  } = props;

  const [value, onChange] = useControlState(props);

  const states: ISegmentState = {
    value,
    size,
    isFullWidth,
  };

  return (render?.root ?? iRootRender)(
    {
      gap,
      className: classNames(
        styles.wrap,
        styles[size],
        {
          [styles.isFullWidth]: isFullWidth,
        },
        className
      ),
      segments: options?.map((item) => (
        <Fragment key={item.value}>
          {(render?.item ?? iItemRender)(
            {
              ...item,
              onChange,
              className: classNames(styles.item, {
                [styles.disabled]: item.disabled,
              }),
            },
            states
          )}
        </Fragment>
      )),
      ...others,
    },
    states
  );
};
