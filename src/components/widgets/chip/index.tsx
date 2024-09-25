import { Fragment, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isTrue } from '@busymango/is-esm';

import { useMemoFunc } from '@/hooks';
import type { ReactCFC } from '@/models';
import { iEscapeEvent, iPropagation } from '@/utils';

import { useControlState } from '../control';
import { ISignLine } from '../sign';
import { ISpinner } from '../spinners';
import { ISVGWrap } from '../svg-wrap';
import { IWave } from '../wave';
import type {
  IChipGroupProps,
  IChipPrefixRender,
  IChipProps,
  IChipState,
  IChipSuffixRender,
} from './models';

import * as styles from './index.scss';

const iPrefixRender: IChipPrefixRender = (
  { icon, close, ...others },
  { isLoading }
) => (
  <ISVGWrap {...others}>
    <AnimatePresence>{isLoading ? <ISpinner /> : icon}</AnimatePresence>
  </ISVGWrap>
);

const iSuffixRender: IChipSuffixRender = ({
  icon,
  close,
  onClose,
  ...others
}) => (
  <AnimatePresence>
    {close && (
      <ISVGWrap whileHover={{ scale: 1.12 }} onClick={onClose} {...others}>
        {isTrue(close) ? <ISignLine type="cross" /> : close}
      </ISVGWrap>
    )}
  </AnimatePresence>
);

export const IChip: ReactCFC<IChipProps> = (props) => {
  const {
    icon,
    close,
    style,
    children,
    clickable,
    className,
    isLoading,
    size = 'medium',
    disabled = false,
    variant = 'filled',
    render,
    onKeyDown,
    onClose,
    ...others
  } = props;

  const target = useRef<HTMLSpanElement>(null);

  const states: IChipState = {
    clickable,
    disabled,
    isLoading,
    variant,
    size,
  };

  const iClose = useMemoFunc((event: React.UIEvent<HTMLElement>) => {
    iPropagation(event);
    onClose?.(event);
  });

  return (
    <motion.span
      ref={target}
      className={classNames(
        styles.chip,
        styles[size],
        styles[variant],
        {
          [styles.clickable]: clickable,
          [styles.disabled]: clickable && disabled,
        },
        className
      )}
      style={style}
      onKeyDown={iEscapeEvent(onClose, onKeyDown)}
      {...others}
    >
      {clickable && <IWave target={target} />}
      {(render?.prefix ?? iPrefixRender)(
        { icon, close, onClose: iClose, className: styles.icon },
        states
      )}
      {children}
      {(render?.suffix ?? iSuffixRender)(
        { icon, close, onClose: iClose, className: styles.close },
        states
      )}
    </motion.span>
  );
};

export const IChipGroup: React.FC<IChipGroupProps> = (props) => {
  const { value, chips, variant, icon, onChange, onChipsChange } = props;

  const [iChips, iChipsChange] = useControlState({
    value: chips,
    onChange: onChipsChange,
  });

  return (
    <Fragment>
      {iChips?.map(({ value, label, ...others }, index) => (
        <IChip key={value ?? index} {...others}>
          {label ?? value?.toString()}
        </IChip>
      ))}
    </Fragment>
  );
};
