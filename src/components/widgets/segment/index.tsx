import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { iPressEvent, iThemeVariable } from '@/utils';

import { useControlState } from '../control';
import { IFlex } from '../flex';
import type { ISegmentProps } from './models';

import * as styles from './index.scss';

export const ISegment: React.FC<ISegmentProps> = (props) => {
  const {
    options,
    pattern,
    className,
    isFullWidth,
    defaultValue,
    value: _value,
    gap = iThemeVariable('--gap-02'),
    onChange: _onChange,
    ...others
  } = props;

  const [value, onChange] = useControlState(props);

  return (
    <IFlex className={classNames(styles.wrap, className)} gap={gap} {...others}>
      {options?.map((item) => (
        <button
          key={item.value}
          className={styles.item}
          tabIndex={0}
          onClick={() => onChange(item.value)}
          onKeyDown={iPressEvent(() => {
            onChange(item.value);
          })}
        >
          {item.label}
          {value === item.value && (
            <motion.div className={styles.thumb} layoutId="arrow" />
          )}
        </button>
      ))}
    </IFlex>
  );
};
