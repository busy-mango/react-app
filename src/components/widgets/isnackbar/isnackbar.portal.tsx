import { AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';

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
}> = ({ max = 1 }) => (
  <FloatingPortal root={container}>
    <IOverlay className={styles.overlay}>
      <IFlex vertical align="center" className={styles.container}>
        <AnimatePresence mode="popLayout">
          {useSnackbars(({ snackbars }) => snackbars).map((rect) => (
            <ISnackbar {...rect} key={rect.id} />
          ))}
        </AnimatePresence>
      </IFlex>
    </IOverlay>
  </FloatingPortal>
);
