import { useRef, useState } from 'react';
import classNames from 'classnames';
import { motion, useScroll } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import type { ControlOptionModel } from '@/components/models';
import type { ReactCFC, WrapperProps } from '@/models';

import { IOverlay } from '../ioverlay';

import styles from './index.scss';

const IWheelOption: ReactCFC<{
  container?: React.RefObject<HTMLElement>;
}> = ({ children, container }) => {
  const target = useRef<HTMLDivElement>(null);

  const scroll = useScroll({ target, container });

  return (
    <motion.div
      ref={target}
      className={styles.option}
      initial={{ opacity: 0.88 }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

const IWheel: React.FC<{
  options?: ControlOptionModel[];
}> = ({ options }) => {
  const [focused, setFocused] = useState<number>(1);

  const container = useRef(null);

  return (
    <div ref={container} className={styles.colum}>
      <IWheelOption key={-2} />
      <IWheelOption key={-1} />
      {options?.map(({ value, label }) => (
        <IWheelOption key={value} container={container}>
          {label}
        </IWheelOption>
      ))}
      <IWheelOption key={1} />
      <IWheelOption key={2} />
    </div>
  );
};

const iDismissProps = { outsidePressEvent: 'mousedown' } as const;

export interface IPickerProps extends OmitOf<WrapperProps, 'title'> {
  open?: boolean;
  initialOpen?: boolean;
  colums?: ControlOptionModel[][];
  onOpenChange?: (open: boolean) => void;
}

export const IPicker: React.FC<IPickerProps> = ({
  className,
  initialOpen,
  colums,
  style,
  ...others
}) => {
  const isControl = 'open' in others;

  const { refs, context } = useFloating({
    onOpenChange: others.onOpenChange,
    open: isControl ? others.open : initialOpen,
  });
  const click = useClick(context);

  const dismiss = useDismiss(context, iDismissProps);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);
  return (
    <FloatingPortal>
      <IOverlay className={styles.overlay}>
        <div
          ref={refs.setFloating}
          className={classNames(styles.wrap, className)}
          {...getFloatingProps({ style })}
        >
          <div className={styles.container}>
            {colums?.map((colum, index) => (
              <IWheel key={index} options={colum} />
            ))}
          </div>
        </div>
      </IOverlay>
    </FloatingPortal>
  );
};
