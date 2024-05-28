import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import type { AnimationDefinition, AnimationProps } from 'framer-motion';
import { motion } from 'framer-motion';

import { isNumber, isObject } from '@busymango/is-esm';
import { isEqual } from '@busymango/utils';

import { useEventState, useMemoFunc } from '@/hooks';

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

  const target = useRef(null);

  const _destory = useSnackbars(({ destory }) => destory);

  const destory = useMemoFunc(() => _destory(id));

  const isHover = useEventState({
    start: 'mouseenter',
    end: 'mouseleave',
    target,
  });

  const api = useRef({ id, destory });

  useEffect(() => {
    api.current.id = id;
  }, [id]);

  useEffect(() => {
    if (!isHover && isNumber(duration)) {
      const timer = setTimeout(destory, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isHover, destory]);

  const onAnimationComplete = useMemoFunc((animation: AnimationDefinition) => {
    if (isObject(animation) && isEqual(animation, initial)) {
      onExit?.(api.current);
    }
  });

  return (
    <motion.div
      ref={target}
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
      onAnimationComplete={onAnimationComplete}
      {...others}
    >
      {icon && <motion.div>{icon}</motion.div>}
      <motion.div>{children}</motion.div>
      {close && <motion.div onClick={destory}>{close}</motion.div>}
    </motion.div>
  );
};
