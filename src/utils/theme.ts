import { t } from 'i18next';

import { isString } from '@busymango/is-esm';

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
  if (!isString(process.env.THEME)) {
    throw new Error(t('common:Theme not found'));
  }
  return process.env.THEME as T;
};
