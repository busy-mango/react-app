import { useMemo } from 'react';
import { produce } from 'immer';
import type { AnimationScope } from 'motion/react';
import { useAnimate } from 'motion/react';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { isNumber } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';
import { assign, contains, sizeOf, theFirst, theLast } from '@busymango/utils';

import { useMemoFunc } from '@/hooks';

import type {
  ISnackbarActions,
  ISnackbarAPI,
  ISnackbarProps,
  ISnackbarStatus,
  ISnackbarStore,
} from '../models';

export const snackbar = {
  apis: new Map<React.Key, ISnackbarAPI>(),
  emit: async (config: Partial<ISnackbarProps>) => {
    const initial: ISnackbarProps = { id: nanoid(), duration: 3000 };
    const options = assign<ISnackbarProps>(initial, config);
    return await useSnackbars.getState().emit(options);
  },
  ...(() =>
    (['info', 'danger', 'warn', 'success'] satisfies ISnackbarStatus[]).reduce(
      (accom, status) => ({
        ...accom,
        [status]: async (config: OmitOf<Partial<ISnackbarProps>, 'status'>) => {
          const id = nanoid();
          const duration = 3000;
          const initial: ISnackbarProps = { id, status, duration };
          const options = assign<ISnackbarProps>(initial, config);
          return await useSnackbars.getState().emit(options);
        },
      }),
      {} as Record<
        ISnackbarStatus,
        (config: OmitOf<Partial<ISnackbarProps>, 'status'>) => Promise<void>
      >
    ))(),
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

export const useShakeAnimate = <T extends Element = HTMLDivElement>(): [
  AnimationScope<T>,
  () => Promise<void>,
] => {
  const [scope, animate] = useAnimate<T>();

  const iShakeAnimate = useMemoFunc(async () => {
    await animate(
      scope.current,
      { rotate: [-1, 1, -0.6, 0.6, -0.3, 0.3, -0.1, 0.1, 0] },
      { duration: 0.4, velocity: 100, repeatType: 'reverse' }
    );
  });

  return useMemo(() => [scope, iShakeAnimate], [scope, iShakeAnimate]);
};
