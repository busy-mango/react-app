import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'framer-motion';

import { isArray, isHTMLElement, isNil } from '@busymango/is-esm';
import { FRAME2MS } from '@busymango/utils';

import { useDebounceFunc, useEffectOnce } from '@/hooks';
import type { ReactCFC } from '@/models';
import { isCentered } from '@/utils';

import { useControlState } from '../control';
import {
  identified,
  iScrollIntoView,
  isSupportSnape,
  iTarget,
  WHEEL_ITEM_ID_NAME,
} from './helpers';
import type { IWheelOptionProps, IWheelProps } from './models';

import * as styles from './index.scss';

const IWheelOption: ReactCFC<IWheelOptionProps> = (props) => {
  const { container, children, isFocus, ...others } = props;

  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    container,
    layoutEffect: false,
    offset: ['end end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 0, -16]);

  return (
    <motion.div
      ref={target}
      animate={{
        scale: scale.get(),
        rotateX: rotateX.get(),
        translateZ: translateZ.get(),
      }}
      className={classNames(styles.option, isFocus && styles.focus)}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0.88 }}
      transition={{ ease: 'linear', duration: 0 }}
      whileInView={{ opacity: 1 }}
      onClick={() => {
        iScrollIntoView(target);
      }}
      {...others}
    >
      {children}
    </motion.div>
  );
};

export const IWheel: React.FC<IWheelProps> = (props) => {
  const { options, isScrollSnape = isSupportSnape() } = props;

  const view = useRef<string>();

  const [focus, setFocus] = useState<string>();

  const container = useRef<HTMLDivElement>(null);

  const [value, onChange] = useControlState(props);

  const iEventListener = useDebounceFunc(() => {
    if (!isNil(focus)) {
      const { current } = container;
      const element = iTarget({ id: focus, current, options });
      if (isHTMLElement(element) && view.current !== focus) {
        view.current = focus;
        iScrollIntoView(element);
      }
    }
  }, 0);

  useEffect(() => {
    const { current } = container;
    if (current && !isScrollSnape) {
      const { starer, cancel } = iEventListener;
      current?.addEventListener('scrollend', starer);
      return () => {
        cancel();
        current?.removeEventListener('scrollend', starer);
      };
    }
  }, [container, iEventListener, isScrollSnape]);

  const iScroll = useDebounceFunc(() => {
    const index = options?.findIndex((option, index) => {
      const id = identified(option?.value, index);
      const selector = `[${WHEEL_ITEM_ID_NAME}="${id}"]`;
      const element = container.current?.querySelector(selector);
      return isCentered(element, container.current);
    });

    if (!isNil(index) && options?.[index]) {
      onChange(options[index].value);
      setFocus(identified(options[index]?.value, index));
    }
  }, 1 * FRAME2MS);

  useEffect(() => {
    iScroll.starer();
  }, [iScroll, iScroll.starer]);

  useEffectOnce(
    () => {
      const { current } = container;
      const index = options?.findIndex((e) => e.value === value);
      const element = iTarget({ index, current, options });
      isHTMLElement(element) && iScrollIntoView(element);
    },
    !isNil(value) && isArray(options)
  );

  return (
    <div
      ref={container}
      className={classNames(styles.wheel, {
        [styles.isScrollSnap]: isScrollSnape,
      })}
      onScroll={iScroll.starer}
    >
      <IWheelOption key={-3} container={container} />
      <IWheelOption key={-2} container={container} />
      <IWheelOption key={-1} container={container} />
      {options?.map((option, index) => {
        const id = identified(option?.value, index);
        return (
          <IWheelOption
            key={option.value}
            container={container}
            isFocus={focus === id}
            {...{ [WHEEL_ITEM_ID_NAME]: id }}
          >
            {option.label}
          </IWheelOption>
        );
      })}
      <IWheelOption key={1} container={container} />
      <IWheelOption key={2} container={container} />
      <IWheelOption key={3} container={container} />
    </div>
  );
};
