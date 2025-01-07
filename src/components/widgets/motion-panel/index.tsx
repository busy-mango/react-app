/**
 * @description 消息反馈组件
 */

import { useRef } from 'react';
import classNames from 'classnames';
import type { Target, Transition } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';

import { useRecord } from '@/hooks';
import type { ReactCFC } from '@/models';

import type { IPanelProps, IPanelRender } from './models';

import * as styles from './index.scss';

const initial: Target = { opacity: 0, height: 0 };

const transition: Transition = { ease: 'circIn' };

const iRender: IPanelRender = ({ children, ...others }, { record }) => (
  <div {...others}>{children || record}</div>
);

export const IPanel: ReactCFC<IPanelProps> = (props) => {
  const {
    children,
    className,
    visible = true,
    ghosting = true,
    render,
    ...others
  } = props;

  const target = useRef<HTMLDivElement>(null);

  const record = useRecord(children, visible && ghosting);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, height: 'auto' }}
          className={classNames(styles.wrap, className)}
          exit={initial}
          initial={initial}
          transition={transition}
          {...others}
        >
          {(render ?? iRender)(
            { ref: target, className: styles.content, children },
            { record }
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export * from './models';
