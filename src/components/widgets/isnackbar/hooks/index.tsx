import { produce } from 'immer';
import { create } from 'zustand';

import { isNumber } from '@busymango/is-esm';
import { includes, theFirst, theLast } from '@busymango/utils';

import { sizeOf } from '@/utils';

import type {
  ISnackbarActions,
  ISnackbarProps,
  ISnackbarStore,
} from '../models';

export const useSnackbars = create<ISnackbarStore & ISnackbarActions>(
  (set, get) => ({
    max: 3,
    snackbars: [],
    setMaxCount: (recipe) => {
      set(
        produce((ref: ISnackbarStore) => {
          ref.max = recipe(ref.max);
        })
      );
    },
    destory: (key) => {
      set(
        produce(({ snackbars }: ISnackbarStore) => {
          const index = snackbars.findIndex(({ id }) => id === key);
          snackbars.splice(index, 1);
        })
      );
    },
    emit: async (config: ISnackbarProps) => {
      const { snackbars: previous, max } = get();
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
              const count = sizeOf(snackbars);
              if (isNumber(max) && count > max) {
                snackbars.splice(0, count - max);
              }
            })
          );
        });
      }
    },
  })
);
