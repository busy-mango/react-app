/**
 * @description 消息反馈组件
 */

import { useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useRecord, useResize } from '@/hooks';
import type { ReactCFC } from '@/models';

import type { IMotionPanelProps } from './models';

import styles from './index.scss';

export const IMotionPanel: ReactCFC<IMotionPanelProps> = (props) => {
  const {
    style,
    children,
    className,
    visible = true,
    ghosting = true,
    wrapClassName,
    ...others
  } = props;

  const record = useRecord(children, visible && ghosting);

  const ref = useRef<HTMLDivElement>(null);

  const { height } = useResize(ref) ?? {};

  return (
    <motion.div
      animate={{
        opacity: visible ? 1 : 0,
        height: visible ? height : 0,
      }}
      className={classNames(styles.wrap, wrapClassName)}
      initial={{ opacity: 0, height: 0 }}
      transition={{ ease: 'easeOut' }}
    >
      <div
        ref={ref}
        className={classNames(styles.content, className)}
        style={style}
        {...others}
      >
        {children || record}
      </div>
    </motion.div>
  );
};

export * from './models';
