import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';

import { useResizeObserver } from '@/hooks';

import { onTextAreaCatch, useControlState } from '../control';
import { iTextareaSize } from './helpers';
import type { ITextAreaProps, ITextareaRef } from './models';

import * as iStyles from '@/styles/widgets.scss';
import * as styles from './index.scss';

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

    const [value, iChange] = useControlState({
      onCatch: onTextAreaCatch,
      ...other,
    });

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
