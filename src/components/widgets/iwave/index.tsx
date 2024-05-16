import { Fragment, useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';

import { useEventState, useMemoFunc } from '@/hooks';
import type { ReactTargetType } from '@/models';

import styles from './index.scss';

export const IWave: React.FC<{
  placeholder?: boolean;
  target: ReactTargetType;
}> = ({ target, placeholder }) => {
  const memo = useRef(false);

  const [scope, animate] = useAnimate();

  const animation = useMemoFunc(async () => {
    memo.current = true;
    await animate(scope.current, {
      repeatType: 'reverse',
      boxShadow: [
        '0 0 0 1px rgb(var(--wave-color) / 0.05)',
        '0 0 0 6px rgb(var(--wave-color) / 0.2)',
        '0 0 0 12px rgb(var(--wave-color) / 0)',
      ],
    });
    memo.current = false;
  });

  const isClick = useEventState({
    target,
    end: 'mouseup',
    start: 'mousedown',
  });

  const isTouch = useEventState({
    target,
    end: 'touchend',
    start: 'touchstart',
  });

  useEffect(() => {
    (isClick || isTouch) && !memo.current && animation();
  }, [animation, isClick, isTouch]);

  return (
    <Fragment>
      <div ref={scope} className={styles.wrap} />
      {placeholder && (
        <motion.div
          className={styles.wrap}
          initial={{
            boxShadow: '0 0 0 4px rgb(var(--wave-color) / 0.1)',
          }}
        />
      )}
    </Fragment>
  );
};
