import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { isFalse, isTrue } from '@busymango/is-esm';
import { FloatingPortal } from '@floating-ui/react';

import { container } from '@/init';
import type { ReactCFC } from '@/models';
import { iFindElement } from '@/utils';

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
    if (isFalse(mounted)) {
      isTrue(open) && setMount(true);
    }
  }, [open, mounted]);

  if (isTrue(mounted)) {
    return (
      <FloatingPortal root={iFindElement(root) ?? container}>
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
