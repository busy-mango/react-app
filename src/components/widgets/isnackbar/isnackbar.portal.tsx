import { useDeferredValue, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { nanoid } from 'nanoid';

import { isNumber } from '@busymango/is-esm';
import { assign } from '@busymango/utils';
import { FloatingPortal } from '@floating-ui/react';

import { container } from '@/init';
import type { ReactCFC } from '@/models';

import { IFlex } from '../iflex';
import { IOverlay } from '../ioverlay';
import { useSnackbars } from './hooks';
import { ISnackbar } from './isnackbar';
import type { ISnackbarProps } from './models';

import styles from './index.scss';

export const snackbar = {
  emit: async (config: Partial<ISnackbarProps>) => {
    const initial: ISnackbarProps = { id: nanoid(), duration: 3000 };
    const options = assign<ISnackbarProps>(initial, config);
    return await useSnackbars.getState().emit(options);
  },
};

export const ISnackbarPortal: ReactCFC<{
  max?: number;
}> = ({ max }) => {
  const { snackbars, setMaxCount } = useSnackbars(
    ({ snackbars, setMaxCount }) => ({ snackbars, setMaxCount })
  );

  useEffect(() => {
    if (isNumber(max)) {
      setMaxCount(() => max);
    }
  }, [max, setMaxCount]);

  return (
    <FloatingPortal root={container}>
      <IOverlay className={styles.overlay}>
        <IFlex vertical align="center" className={styles.container}>
          <MotionConfig reducedMotion="never">
            <AnimatePresence mode="sync">
              {useDeferredValue(snackbars).map((rect, index) => (
                <ISnackbar
                  style={{ zIndex: -1 * index }}
                  {...rect}
                  key={rect.id}
                />
              ))}
            </AnimatePresence>
          </MotionConfig>
        </IFlex>
      </IOverlay>
    </FloatingPortal>
  );
};
