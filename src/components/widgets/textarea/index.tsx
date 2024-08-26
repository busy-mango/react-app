import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';

import { useMemoFunc, useResizeObserver } from '@/hooks';

import { useControlState } from '../control';
import { iTextareaSize } from './helpers';
import type { ITextAreaEvent, ITextAreaProps, ITextareaRef } from './models';

import iStyles from '@/components/widgets/common.scss';
import styles from './index.scss';

export const ITextArea = forwardRef<ITextareaRef, ITextAreaProps>(
  function TextareaAutosize(props, ref) {
    const {
      style,
      className,
      minRows = 1,
      maxRows = 3,
      placeholder,
      ...other
    } = props;

    const record = useRef<string | null>(null);

    const input = useRef<HTMLTextAreaElement>(null);

    const shadow = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => input, [input]);

    const [value, onChange] = useControlState(other);

    useResizeObserver(shadow, () => {
      const { current: iInput } = input;

      const { current: iShadow } = shadow;

      if (iInput && iShadow) {
        const options = { maxRows, minRows, placeholder };
        const { height, overflow } = iTextareaSize(iInput, iShadow, options);

        if (record.current !== height) iInput.style.height = height;
        if (record.current !== height) record.current = height;

        iInput.style.overflow = overflow;
      }
    });

    const iChange = useMemoFunc(({ target }: ITextAreaEvent) => {
      onChange?.(target.value);
    });

    return (
      <Fragment>
        <textarea
          ref={input}
          className={classNames(styles.textarea, className)}
          placeholder={placeholder}
          rows={minRows}
          style={style}
          {...other}
          value={value}
          onChange={iChange}
        />
        <textarea
          ref={shadow}
          aria-hidden
          readOnly
          className={iStyles.shadow}
          style={style}
          tabIndex={-1}
        />
      </Fragment>
    );
  }
);

export type { ITextAreaProps } from './models';
