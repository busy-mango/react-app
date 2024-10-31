import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { isHTMLElement } from '@busymango/is-esm';
import type { FloatingContext, FloatingPortalProps } from '@floating-ui/react';
import { FloatingPortal } from '@floating-ui/react';

import { iFloatingMotion } from './helpers';

export interface IFloatingProps extends HTMLMotionProps<'div'> {
  style?: React.CSSProperties;
  context: FloatingContext;
  portal?: FloatingPortalProps;
}

export const IFloating: React.FC<IFloatingProps> = (props) => {
  const { context, className, style, children, portal, ...others } = props;

  const { open, placement, refs } = context;

  const isTop = placement.startsWith('top');

  const { current: reference } = refs.reference ?? {};

  if (isHTMLElement(reference)) {
    return (
      <FloatingPortal {...portal}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              className={className}
              transition={{
                duration: 0.15,
                ease: 'easeOut',
                originY: isTop ? 1 : 0,
              }}
              {...iFloatingMotion({ root: portal?.root, style, ...refs })}
              {...others}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    );
  }
};
