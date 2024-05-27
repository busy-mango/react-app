/**
 * @description 消息反馈组件
 */

import { useRef, useState } from 'react';
import classNames from 'classnames';
import type { Target, Transition } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { useMemoFunc, useRecord, useResizeObserver } from '@/hooks';
import type { ReactCFC } from '@/models';

import type { IMotionPanelProps } from './models';

import styles from './index.scss';

const initial: Target = { opacity: 0, height: 0 };

const transition: Transition = { ease: 'circIn' };

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

  const target = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number>();

  const record = useRecord(children, visible && ghosting);

  const iSyncHeight = useMemoFunc(({ clientHeight }: HTMLElement) => {
    clientHeight !== height && setHeight(clientHeight);
  });

  useResizeObserver(target, iSyncHeight, visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, height }}
          className={classNames(styles.wrap, wrapClassName)}
          exit={initial}
          initial={initial}
          transition={transition}
        >
          <div
            ref={target}
            className={classNames(styles.content, className)}
            style={style}
            {...others}
          >
            {children || record}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export * from './models';
