import { Fragment, useEffect, useRef } from 'react';
import classNames from 'classnames';
import type { Target } from 'framer-motion';
import { motion, useAnimate } from 'framer-motion';

import { compact, FRAME2MS } from '@busymango/utils';

import { useEventState, useMemoFunc, useResizeObserver } from '@/hooks';
import type { ReactTargetType } from '@/models';
import { iThemeVariable } from '@/utils';

import * as styles from './index.scss';

const initial: Target = {
  boxShadow: `0 0 0 4px ${iThemeVariable(`--wave-color-0`)}`,
};

export const IWave: React.FC<{
  className?: string;
  placeholder?: boolean;
  measure?: ReactTargetType;
  target: ReactTargetType;
}> = (props) => {
  const { className, target, measure, placeholder } = props;

  const memo = useRef(false);

  const [scope, animate] = useAnimate<HTMLDivElement>();

  const animation = useMemoFunc(async () => {
    memo.current = true;

    const boxShadow = compact(
      ['1', '2', '3'].map((gradation) =>
        iThemeVariable(`--wave-color-${gradation}`)
      )
    ).map((color, index) => `0 0 0 ${index * 3}px ${color}`);

    await animate(
      scope.current,
      { boxShadow },
      {
        duration: 0.4,
        velocity: 100,
        repeatType: 'reverse',
      }
    );

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

  useResizeObserver(
    measure,
    ({ clientWidth, clientHeight }) => {
      scope.current.style.width = `${clientWidth}px`;
      scope.current.style.height = `${clientHeight}px`;

      console.log(clientWidth, clientHeight);
    },
    { debounce: 10 * FRAME2MS }
  );

  useEffect(() => {
    (isClick || isTouch) && !memo.current && animation();
  }, [animation, isClick, isTouch]);

  return (
    <Fragment>
      <div ref={scope} className={classNames(styles.wrap, className)} />
      {placeholder && <motion.div className={styles.wrap} initial={initial} />}
    </Fragment>
  );
};
