import { forwardRef, useImperativeHandle, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { IDollarPath } from './dollar';
import { IHelperPath } from './helper';
import { iAnimateLine, initial, iTrigon, transition } from './helpers';
import { IMagnifierPath } from './magnifier';
import type { ISignLineProps } from './models';

export const ISignLine = forwardRef<SVGSVGElement, ISignLineProps>(
  function SignLine(props, iForwardRef) {
    const { type, ring, style, animate, trigon, inline, ...others } = props;

    const ref = useRef<SVGSVGElement>(null);

    useImperativeHandle(iForwardRef, () => ref.current!, [ref]);

    return (
      <motion.svg
        ref={ref}
        animate={{
          ...animate,
          scale: inline || ring || trigon ? 1 : 1.325,
        }}
        data-sign-icon={type}
        fill="none"
        height="1em"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={96}
        style={{ ...style, cursor: 'inherit' }}
        version="1.1"
        viewBox="0 0 1024 1024"
        width="1em"
        {...others}
      >
        <AnimatePresence>
          {ring && (
            <motion.circle
              key="circle"
              cx={512}
              cy={512}
              r={464}
              transition={transition}
            />
          )}
          {trigon && (
            <motion.path
              key="trigon"
              animate={{ d: iTrigon(512, 512, 464) }}
              exit={initial}
              initial={initial}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {iAnimateLine(type).map((animate, index) => (
            <motion.path
              key={index.toLocaleString()}
              animate={animate}
              exit={initial}
              initial={initial}
              transition={transition}
            />
          ))}
          {type === 'dollar' && <IDollarPath key="dollar" />}
          {type === 'helper' && <IHelperPath key="helper" />}
          {type === 'magnifier' && <IMagnifierPath key="magnifier" />}
        </AnimatePresence>
      </motion.svg>
    );
  }
);
