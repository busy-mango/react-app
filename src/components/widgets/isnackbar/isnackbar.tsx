import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import type { AnimationProps } from 'framer-motion';
import { motion } from 'framer-motion';

import { isNumber, isObject } from '@busymango/is-esm';
import { isEqual } from '@busymango/utils';

import { useMemoFunc } from '@/hooks';

import { useSnackbars } from './hooks';
import type { ISnackbarProps } from './models';

import styles from './index.scss';

const initial: AnimationProps['initial'] = {
  y: '-100%',
  scaleY: 0.96,
  opacity: 0.36,
};

export const ISnackbar: React.FC<ISnackbarProps> = (props) => {
  const { id, icon, close, duration, children, className, onExit, ...others } =
    props;

  const _destory = useSnackbars(({ destory }) => destory);

  const destory = useMemoFunc(() => _destory(id));

  const api = useRef({ id, destory });

  useEffect(() => {
    api.current.id = id;
  }, [id]);

  useEffect(() => {
    if (isNumber(duration)) {
      const timer = setTimeout(destory, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, destory]);

  return (
    <motion.div
      layout
      animate={{
        y: 0,
        scaleY: 1,
        opacity: 1,
        originY: 0,
      }}
      className={classNames(styles.snackbar, className)}
      exit={initial}
      initial={initial}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      onAnimationComplete={(animation) => {
        if (isObject(animation) && isEqual(animation, initial)) {
          onExit?.(api.current);
        }
      }}
      {...others}
    >
      {icon && <motion.div>{icon}</motion.div>}
      <motion.div>{children}</motion.div>
      {close && <motion.div onClick={destory}>{close}</motion.div>}
    </motion.div>
  );
};
