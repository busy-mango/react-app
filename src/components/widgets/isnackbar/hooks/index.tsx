import { produce } from 'immer';
import { create } from 'zustand';

import type {
  ISnackbarActions,
  ISnackbarProps,
  ISnackbarStore,
} from '../models';

export const useSnackbars = create<ISnackbarStore & ISnackbarActions>(
  (set) => ({
    destory: (key) => {
      set(
        produce(({ snackbars }: ISnackbarStore) => {
          const index = snackbars.findIndex(({ id }) => id === key);
          snackbars.splice(index, 1);
        })
      );
    },
    emit: async (config: ISnackbarProps) => {
      await new Promise((onExit) => {
        set(
          produce(({ snackbars }: ISnackbarStore) => {
            snackbars.push({ ...config, onExit });
          })
        );
      });
    },
    snackbars: [],
  })
);
