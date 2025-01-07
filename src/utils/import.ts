import type { ReactComponentAsync } from '@/models';

/** 动态导入页面chunk */
export function routeAsync(route: string) {
  return import(`../pages${route}`) as Promise<ReactComponentAsync>;
}

/** 动态导入图标chunk */
export function iconAsync(route: string) {
  return import(`../icons${route}?react`) as Promise<ReactComponentAsync>;
}

/** 动态导入案例chunk */
export function caseAsync(route: string) {
  return import(`../examples${route}`) as Promise<ReactComponentAsync>;
}

/** 动态导入语言包 */
export function i18nAsync<L extends string = string, N extends string = string>(
  language: L,
  namespace?: N
) {
  const json = `${namespace ?? 'translation'}.json`;
  return import(`@/i18n/${language}/${json}`) as Promise<
    Record<string, string>
  >;
}

/** 动态导入ReactQueryDevtools */
export const devtoolAsync = async () => {
  const component = import('@tanstack/react-query-devtools');
  return { default: (await component).ReactQueryDevtools };
};
