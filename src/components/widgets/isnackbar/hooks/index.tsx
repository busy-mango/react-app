import { produce } from 'immer';
import { create } from 'zustand';

import { includes, theFirst, theLast } from '@busymango/utils';

import type {
  ISnackbarActions,
  ISnackbarProps,
  ISnackbarStore,
} from '../models';

export const useSnackbars = create<ISnackbarStore & ISnackbarActions>(
  (set, get) => ({
    snackbars: [],
    destory: (key) => {
      set(
        produce(({ snackbars }: ISnackbarStore) => {
          const index = snackbars.findIndex(({ id }) => id === key);
          snackbars.splice(index, 1);
        })
      );
    },
    emit: async (config: ISnackbarProps) => {
      const { snackbars: previous } = get();
      const assert = ({ id }: ISnackbarProps) => id === config.id;
      if (includes(previous, assert)) {
        set(
          produce(({ snackbars }: ISnackbarStore) => {
            const current = snackbars.find(assert);
            Object.entries(config).forEach((attr) => {
              const key = theFirst(attr) as keyof ISnackbarProps;
              if (current && key !== 'id') {
                current[key] = theLast(attr) as ISnackbarProps;
              }
            });
          })
        );
      } else {
        await new Promise((onExit) => {
          set(
            produce(({ snackbars }: ISnackbarStore) => {
              snackbars.push({ ...config, onExit });
            })
          );
        });
      }
    },
  })
);
