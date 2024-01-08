import { useEffect } from 'react';
import { create } from 'zustand';

import { theme as intial } from '@/init';
import {
  isBoolean,
  isFalse,
  isNonEmptyString,
  isTrue,
} from '@busymango/is-esm';

import { useEffectOnce } from './effect.once';
import { useMemoFunc } from './memo.func';

export type AppState = {
  /** 主题样式 */
  theme: string;
  /** 边栏是否收起 */
  collapsed: boolean;
  /** 是否正在请求页面Chunk */
  isLoadable: boolean;
  /** 页面是否可见 */
  isDocumentVisible: boolean;
  /** 页面标题 */
  title?: React.ReactNode;
};

export type AppAction = {
  action: {
    set: (state: Partial<AppState>, replace?: boolean) => void;
  };
};

export const useAppState = create<AppState & AppAction>((set) => ({
  theme: intial.default,
  isDocumentVisible: document.visibilityState === 'visible',
  isLoadable: false,
  collapsed: false,
  action: {
    set,
  },
}));

export const useAppAction = () => useAppState((ref) => ref.action);

/** 获取APP当前主题样式名称 */
export const useAppTheme = () => useAppState((ref) => ref.theme);

/** 获取APP是否可见 */
export const useAppIsVisible = () =>
  useAppState((ref) => ref.isDocumentVisible);

/** 获取APP当前页面标题 */
export const useAppTitle = (state: string) => {
  const { set } = useAppAction();

  const dispatch = useMemoFunc(() => {
    set({ title: state });
  });

  useEffect(() => {
    isNonEmptyString(state) && dispatch();
  }, [state, dispatch]);

  return useAppState((ref) => ref.title);
};

export const useAppCollapsed = (
  /** 控制边栏是否收起 */
  state?: boolean,
  /** 是否仅执行一次 */
  once = false
) => {
  const { set } = useAppAction();

  const dispatch = useMemoFunc(() => {
    set({ collapsed: state });
  });

  useEffect(() => {
    isFalse(once) && isBoolean(state) && dispatch();
  }, [once, state, dispatch]);

  useEffectOnce(() => dispatch(), isTrue(once) && isBoolean(state));

  return useAppState((ref) => ref.collapsed);
};
