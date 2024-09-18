import { forwardRef, useImperativeHandle, useRef } from 'react';

import { or } from '@busymango/utils';

import type { WrapperProps } from '@/models';

interface MeasureRef {
  native: HTMLSpanElement;
}

interface MeasureProps extends WrapperProps<HTMLSpanElement> {}

function cuttable(node: React.ReactElement) {
  const type = typeof node;
  return or(['string', 'number'], (val) => val === type);
}

export const Measure = forwardRef<MeasureRef, MeasureProps>(
  function Measure(props, iForwardRef) {
    const { style, children } = props;

    const ref = useRef<HTMLSpanElement>(null);

    useImperativeHandle(iForwardRef, () => ({ native: ref.current! }), [ref]);

    return (
      <span
        ref={ref}
        aria-hidden
        style={{
          top: 0,
          left: 0,
          opacity: 0,
          display: 'block',
          position: 'fixed',
          pointerEvents: 'none',
          visibility: 'hidden',
          ...style,
        }}
      >
        {children}
      </span>
    );
  }
);
