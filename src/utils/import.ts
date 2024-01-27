import type { ReactComponentAsync } from '@/models';

/** 动态导入页面chunk */
export function routeAsync(route: string) {
  return import(`../pages${route}`) as Promise<ReactComponentAsync>;
}

/** 动态导入图标chunk */
export function iconAsync(route: string) {
  return import(`../icons${route}`) as Promise<ReactComponentAsync>;
}

/** 动态导入图标chunk */
export const devtoolAsync = async () => {
  const component = import('@tanstack/react-query-devtools');
  return { default: (await component).ReactQueryDevtools };
};
