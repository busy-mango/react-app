import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { isNumber } from '@busymango/is-esm';
import { assign, contains, theFirst, theLast } from '@busymango/utils';

import { sizeOf } from '@/utils';

import type {
  ISnackbarActions,
  ISnackbarAPI,
  ISnackbarProps,
  ISnackbarStore,
} from '../models';

export const snackbar = {
  apis: new Map<React.Key, ISnackbarAPI>(),
  emit: async (config: Partial<ISnackbarProps>) => {
    const initial: ISnackbarProps = { id: nanoid(), duration: 3000 };
    const options = assign<ISnackbarProps>(initial, config);
    return await useSnackbars.getState().emit(options);
  },
};

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
      if (contains(previous, assert)) {
        set(
          produce(({ snackbars }: ISnackbarStore) => {
            const current = snackbars.find(assert)!;
            const api = snackbar.apis.get(current.id);
            Object.entries(config).forEach((attr) => {
              const key = theFirst(attr) as keyof ISnackbarProps;
              current[key] = theLast(attr) as ISnackbarProps;
            });
            api?.reset();
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
