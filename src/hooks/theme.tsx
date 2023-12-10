/**
 * @author 徐子梁
 * @description 主题控制
 */

import { useEffect } from 'react';
import Cookie from 'js-cookie';

import { container, theme } from '@/init';
import { drive } from '@/service';
import { isCSSStyleRule, isCSSStyleSheet, isNil } from '@busymango/is-esm';
import { useMutation } from '@tanstack/react-query';

function themeSheet() {
  const sheets = Array.from(document.styleSheets);
  return sheets.find((e) => e.title === theme.title);
}

/**
 * 动态主题
 */
export default function useMutateTheme<T extends string = string>() {
  const res = useMutation({
    gcTime: Infinity,
    mutationFn: async (name: T) => {
      const sheet = themeSheet();
      if (!isCSSStyleSheet(sheet)) {
        throw new Error("theme style sheet can't find");
      }

      const selector = `.${name}`;
      const { cssRules } = sheet ?? {};
      const rules = Array.from(cssRules) as CSSStyleRule[];
      const rule = rules.find((e) => e.selectorText.endsWith(selector));

      // 未加载过的主题规则才需要加载
      if (!isCSSStyleRule(rule)) {
        sheet.insertRule(await drive<string>(`/themes/${name}.css`));
      }
      return name;
    },
  });

  const classname = res?.data ?? (theme.default as T);

  useEffect(() => {
    if (isNil(classname)) return;

    Cookie.set(theme.title, classname);
    container.classList.add(classname);

    return () => {
      container.classList.remove(classname);
    };
  }, [classname]);

  return { theme: classname, ...res };
}
