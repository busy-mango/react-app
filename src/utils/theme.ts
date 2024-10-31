import { t } from 'i18next';

import { isString, isValidKey } from '@busymango/is-esm';
import { iCSSVariable } from '@busymango/utils';

/** 文档根节点：通常是HTML元素 */
export const { documentElement: iThemeRoot } = document;

type ColorDisc<T> = T extends `--${infer N}-color-100` ? N : never;

export type ThemeColorToken = ColorDisc<keyof React.CSSVarProps>;

/**
 * 获取主题样式标签
 */
export const iThemeElement = () => {
  const selector = 'link[title="theme"]';
  return document.querySelector(selector) as HTMLLinkElement;
};

/**
 * 获取主题样式规则表
 */
export const iThemeSheet = () => {
  const sheets = Array.from(document.styleSheets);
  return sheets.find(({ title }) => title === 'theme');
};

/**
 * 获取默认主题样式
 */
export const iThemeDefault = <T extends string = string>() => {
  const style = getComputedStyle(iThemeRoot);
  if (style && isValidKey('color-scheme', style, isString)) {
    return style['color-scheme'];
  }
  if (!isString(process.env.THEME)) {
    throw new Error(t('common:Theme not found'));
  }
  return process.env.THEME as T;
};

export const iThemeVariable = (name: keyof React.CSSVarProps) =>
  iCSSVariable(name, { element: iThemeRoot });
