import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import type { AnimationDefinition } from 'framer-motion';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { isArray, isHTMLElement, isNil } from '@busymango/is-esm';
import { FRAME2MS, isEqual, type OmitOf } from '@busymango/utils';
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import type { ControlOptionModel } from '@/components/models';
import {
  useControlState,
  useDebounceFunc,
  useEffectOnce,
  useMemoFunc,
  useToggle,
} from '@/hooks';
import { container } from '@/init';
import type { ReactCFC, ReactMotionDomProps, WrapperProps } from '@/models';
import { isCentered } from '@/utils';

import { IArrow } from '../iarrow';
import { IButton } from '../ibutton';
import { IFlex } from '../iflex';
import { IOverlay } from '../ioverlay';
import {
  DATA_ID_NAME,
  identified,
  iDismissProps,
  iScrollIntoView,
  iWrapAnimate,
  iWrapExit,
  iWrapInitial,
} from './helpers';
import type { IWheelOptionProps, IWheelProps } from './models';

import styles from './index.scss';

const IWheelOption: ReactCFC<IWheelOptionProps> = (props) => {
  const { container, children, isFocus, ...others } = props;

  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    container,
    layoutEffect: false,
    offset: ['end end', 'start start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [32, -32]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 0, -16]);

  const onTab = useMemoFunc(() => {
    iScrollIntoView(target);
  });

  return (
    <motion.div
      ref={target}
      animate={{
        scale: scale.get(),
        rotateX: rotateX.get(),
        translateZ: translateZ.get(),
      }}
      className={classNames(styles.option, isFocus && styles.focus)}
      initial={{ opacity: 0.88 }}
      transition={{ ease: 'linear' }}
      whileInView={{ opacity: 1 }}
      onClick={onTab}
      {...others}
    >
      {children}
    </motion.div>
  );
};

const IWheel: React.FC<IWheelProps> = (props) => {
  const { options } = props;

  const [focus, setFocus] = useState<string>();

  const container = useRef<HTMLDivElement>(null);

  const [value, onChange] = useControlState(props);

  const { starer } = useDebounceFunc(() => {
    const index = options?.findIndex((option, index) => {
      const id = identified(option?.value, index);
      const selector = `[${DATA_ID_NAME}="${id}"]`;
      const element = container.current?.querySelector(selector);
      return isCentered(element, container.current);
    });

    if (!isNil(index) && options?.[index]) {
      onChange(options[index].value);
      setFocus(identified(options[index]?.value, index));
    }
  }, 1 * FRAME2MS);

  useEffect(starer, [starer]);

  useEffectOnce(
    () => {
      const { current } = container;
      const index = options!.findIndex((e) => e.value === value);
      const id = identified(options![index]?.value, index);
      const selector = `[${DATA_ID_NAME}="${id}"]`;
      const element = current?.querySelector(selector);
      isHTMLElement(element) && iScrollIntoView(element);
    },
    !isNil(value) && isArray(options)
  );

  return (
    <div ref={container} className={styles.wheel} onScroll={starer}>
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
            {...{ [DATA_ID_NAME]: id }}
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

export interface IPickerProps
  extends OmitOf<
    ReactMotionDomProps<WrapperProps>,
    'title' | 'onChange' | 'defaultValue'
  > {
  open?: boolean;
  title?: React.ReactNode;
  initialOpen?: boolean;
  defaultValue?: ControlOptionModel['value'][];
  value?: ControlOptionModel['value'][];
  columns?: ControlOptionModel[][];
  onChange?: (value?: ControlOptionModel['value'][]) => void;
  onOpenChange?: (open?: boolean) => void;
}

export const IPicker: React.FC<IPickerProps> = (props) => {
  const {
    style,
    title,
    columns,
    className,
    open: iOpen,
    value: iValue,
    initialOpen: iInitialOpen,
    defaultValue: iDefaultValue,
    onOpenChange: iOpenChange,
    onChange: iChange,
    ...others
  } = props;

  const [value, onChange] = useControlState({
    value: iValue,
    onChange: iChange,
    defaultValue: iDefaultValue,
  });

  const [open, onOpenChange] = useControlState({
    value: iOpen,
    onChange: iOpenChange,
    defaultValue: iInitialOpen,
  });

  const [isPlaying, { on, off }] = useToggle();

  const { refs, context } = useFloating({ open, onOpenChange });

  const focus = useRef(columns?.map((e, i) => value?.[i] ?? e[0].value));

  useEffect(() => {
    const { current } = refs.floating;
    if (open && current) {
      value?.forEach((e, i) => {
        const id = identified(e, i);
        const selector = `[${DATA_ID_NAME}="${id}"]`;
        const element = current.querySelector(selector);
        isHTMLElement(element) && iScrollIntoView(element);
      });
    }
  }, [open, value, refs.floating]);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context, iDismissProps),
  ]);

  const onConfirm = useMemoFunc(() => {
    onChange(focus.current ?? []);
    context.onOpenChange(false);
  });

  const onAnimationStart = useMemoFunc((animate: AnimationDefinition) => {
    isEqual(animate, iWrapExit) && off();
    isEqual(animate, iWrapAnimate) && on();
  });

  const inner = useMemo(
    () =>
      columns
        ?.map(
          (column, index) =>
            column.find((e) => e.value === value?.[index])?.label
        )
        ?.join('-'),
    [columns, value]
  );

  return (
    <Fragment>
      <div
        ref={refs.setReference}
        className={styles.view}
        {...getReferenceProps()}
      >
        <div>{inner}</div>
        <IArrow className={styles.arrow} type="right" />
      </div>
      <FloatingPortal root={container}>
        <AnimatePresence>
          {(context.open || isPlaying) && (
            <IOverlay className={styles.overlay}>
              <AnimatePresence>
                {context.open && (
                  <motion.div
                    ref={refs.setFloating}
                    animate={iWrapAnimate}
                    className={classNames(styles.wrap, className)}
                    exit={iWrapExit}
                    initial={iWrapInitial}
                    onAnimationStart={onAnimationStart}
                    {...others}
                    {...getFloatingProps({ style })}
                  >
                    <IFlex
                      align="center"
                      className={styles.header}
                      justify="space-between"
                    >
                      <motion.h2 layout>{title}</motion.h2>
                      <IButton variant="text" wave={false} onClick={onConfirm}>
                        确定
                      </IButton>
                    </IFlex>
                    <div className={styles.container}>
                      {columns?.map((colum, index) => (
                        <IWheel
                          key={index}
                          options={colum}
                          value={value?.[index]}
                          onChange={(val) => {
                            focus.current = focus.current?.map(
                              (e, i) => (i === index ? val : e) ?? e
                            );
                          }}
                        />
                      ))}
                      <IFlex
                        vertical
                        className={styles.mask}
                        justify="space-between"
                      >
                        <div className={styles.top} />
                        <div className={styles.view} />
                        <div className={styles.bottom} />
                      </IFlex>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </IOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Fragment>
  );
};
