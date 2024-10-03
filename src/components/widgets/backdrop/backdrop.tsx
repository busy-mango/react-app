import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { isTrue } from '@busymango/is-esm';
import { FloatingPortal } from '@floating-ui/react';

import type { ReactCFC } from '@/models';

import type { IBackdropProps } from './models';
import { IOverlay } from './overlay';

import * as styles from './backdrop.scss';

export const IBackdrop: ReactCFC<IBackdropProps> = ({
  root,
  open,
  children,
  className,
  ...others
}) => {
  const [mounted, setMount] = useState(false);

  useEffect(() => {
    isTrue(open) && setMount(true);
  }, [open]);

  if (isTrue(mounted)) {
    return (
      <FloatingPortal root={root}>
        <AnimatePresence>
          {open && (
            <IOverlay
              className={classNames(styles.wrap, className)}
              {...others}
            >
              {children}
            </IOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    );
  }
};
