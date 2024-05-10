/**
 * @description 消息反馈组件
 */

import { useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useRecord, useResize } from '@/hooks';
import type { ReactCFC } from '@/models';
import { isReactNode } from '@/utils';

import type { FeedbackProps } from './models';

import styles from './index.scss';

export const Feedback: ReactCFC<FeedbackProps> = (props) => {
  const {
    style,
    children,
    className,
    wrapClassName,
    status = 'error',
    ...others
  } = props;

  const visible = isReactNode(children);

  const record = useRecord(children, visible);

  const ref = useRef<HTMLDivElement>(null);

  const { height } = useResize(ref) ?? {};

  return (
    <motion.div
      animate={{
        opacity: visible ? 1 : 0,
        height: visible ? height : 0,
      }}
      className={classNames(styles.wrap, styles[status], wrapClassName)}
      initial={{ opacity: 0, height: 0 }}
      transition={{ ease: 'easeInOut' }}
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
