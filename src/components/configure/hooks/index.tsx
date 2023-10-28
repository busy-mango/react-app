/**
 * @author 徐子梁
 */

import { useContext, useEffect } from 'react';

import { isNonEmptyString } from '@busymango/is-esm';

import { AppContext } from '../context';

/** 获取当前样式主题名称 */
export function useAppThemeName() {
  const ctx = useContext(AppContext);
  return ctx?.theme;
}

/** 更新样式主题 */
export function useAppDispatchTheme(theme?: string) {
  const ctx = useContext(AppContext);

  const { theme: _theme, setTheme } = ctx ?? {};

  useEffect(() => {
    if (_theme !== theme && isNonEmptyString(theme)) {
      setTheme?.(theme);
    }
  }, [theme, setTheme]);
}
