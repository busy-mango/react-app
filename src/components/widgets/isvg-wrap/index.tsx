import { useMemo, useRef } from 'react';
import classNames from 'classnames';
import type { Target, Transition } from 'framer-motion';
import { motion } from 'framer-motion';

import type { ReactCFC, ReactMotionDomProps, WrapperProps } from '@/models';
import { iFindElement } from '@/utils';

import { IFlex } from '../iflex';

import styles from './index.scss';

export interface ISVGWrapProps
  extends ReactMotionDomProps<WrapperProps<HTMLElement>> {
  x?: string | number;
  y?: string | number;
}

const transition: Transition = { ease: 'easeOut' };

const iAnimate = ({ x = 0, y = 0 }: Partial<Target>): Target => ({
  opacity: 1,
  scale: 1,
  x,
  y,
});

const iInitial = ({ x = 0, y = 0 }: Partial<Target>): Target => ({
  opacity: 0.36,
  scale: 0.64,
  x,
  y,
});

export const ISVGWrap: ReactCFC<ISVGWrapProps> = (props) => {
  const { x = 0, y = 0, children, className, style, ...others } = props;

  const target = useRef(null);

  const height = useMemo<string | undefined>(() => {
    const element = iFindElement(target);
    if (!CSS.supports('height', '1lh') && element) {
      const { ownerDocument } = element;
      const container = ownerDocument?.defaultView ?? window;
      const computedStyle = container.getComputedStyle(element);
      return computedStyle.lineHeight;
    }
  }, []);

  return (
    <motion.i
      animate={iAnimate({ x, y })}
      className={classNames(styles.wrap, className)}
      exit={iInitial({ x, y })}
      initial={iInitial({ x, y })}
      style={{ height, ...style }}
      transition={transition}
      {...others}
    >
      <IFlex centered className={styles.body}>
        {children}
      </IFlex>
    </motion.i>
  );
};
