import { Fragment, useId } from 'react';
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
  ISegmentThumbRender,
} from './models';

import * as styles from './index.scss';

const iRootRender: ISegmentRootRender = ({ segments, ...others }) => (
  <IFlex layout {...others}>
    {segments}
  </IFlex>
);

const iItemRender: ISegmentItemRender = (
  {
    label,
    icon,
    value,
    thumb,
    extra,
    disabled,
    onChange,
    onKeyDown,
    onClick,
    ...others
  },
  { readOnly }
) => (
  <div className={styles.itemWrap}>
    <button
      {...others}
      tabIndex={0}
      onClick={(event) => {
        onClick?.(event);
        if (!readOnly && !disabled) {
          onChange(value);
        }
      }}
      onKeyDown={iPressEvent(() => {
        if (!readOnly && !disabled) {
          onChange(value);
        }
      }, onKeyDown)}
    >
      <span>
        <AnimatePresence>
          {icon && <ISVGWrap className={styles.icon}>{icon}</ISVGWrap>}
        </AnimatePresence>
        {label}
      </span>
      {extra}
    </button>
    {thumb}
  </div>
);

const iThumbRender: ISegmentThumbRender = ({
  isActive,
  layoutId,
  disabled,
}) => (
  <AnimatePresence>
    {isActive && !disabled && (
      <motion.div
        animate={{ opacity: 1 }}
        className={styles.thumb}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        layoutId={layoutId}
      />
    )}
  </AnimatePresence>
);

export const ISegment: React.FC<ISegmentProps> = (props) => {
  const {
    options,
    disabled,
    readOnly,
    vertical,
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

  const layoutId = useId();

  const [value, onChange] = useControlState(props);

  const states: ISegmentState = {
    isFullWidth,
    readOnly,
    disabled,
    value,
    size,
  };

  return (render?.root ?? iRootRender)(
    {
      gap,
      vertical,
      className: classNames(
        styles.wrap,
        styles[size],
        {
          [styles.vertical]: vertical,
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
                [styles.readOnly]: readOnly,
                [styles.disabled]: disabled ?? item.disabled,
              }),
              thumb: (render?.thumb ?? iThumbRender)(
                {
                  ...item,
                  layoutId,
                  isActive: value === item.value,
                },
                states
              ),
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
