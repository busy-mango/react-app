import { create } from 'zustand';

import { theme as intial } from '@/init';

export type AppState = {
  /** 主题样式 */
  theme: string;
  /** 边栏是否收起 */
  collapsed: boolean;
  /** 是否正在请求页面Chunk */
  isLoadable: boolean;
  /** 页面标题 */
  title?: React.ReactNode;
};

export type AppAction = {
  action: {
    set: (state: Partial<AppState>) => void;
  };
};

export const useAppState = create<AppState & AppAction>((set) => ({
  theme: intial.default,
  isLoadable: false,
  collapsed: false,
  action: {
    set,
  },
}));

export const useAppTheme = () => useAppState((ref) => ref.theme);

export const useAppTitle = () => useAppState((ref) => ref.title);

export const useAppAction = () => useAppState((ref) => ref.action);

export const useAppCollapsed = () => useAppState((ref) => ref.collapsed);
