import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { FloatingPortal } from '@floating-ui/react';

import { container } from '@/init';
import type { ReactCFC } from '@/models';
import { iFindElement } from '@/utils';

import type { IBackdropProps } from './models';
import { IOverlay } from './overlay';

import * as styles from './backdrop.scss';

export const IBackdrop: ReactCFC<IBackdropProps> = ({
  open,
  children,
  className,
  root = container,
  ...others
}) => (
  <FloatingPortal root={iFindElement(root)}>
    <AnimatePresence>
      {open && (
        <IOverlay className={classNames(styles.wrap, className)} {...others}>
          {children}
        </IOverlay>
      )}
    </AnimatePresence>
  </FloatingPortal>
);
