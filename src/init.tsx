/**
 * @description 应用初始化
 */

import { initReactI18next } from 'react-i18next';
import dayjs from 'dayjs';
import type { InitOptions } from 'i18next';
import i18n, { t } from 'i18next';

import { isHTMLElement, isString } from '@busymango/is-esm';
import { dom, ifnot, omit } from '@busymango/utils';

import { iThemeDefault } from './utils';

import 'dayjs/locale/zh-cn';

/**
 * 生成`Chunk`文件用以判断应用版本是否更新
 * 见`src/components/dynamic/hooks/index.tsx`
 */
import(
  /* webpackChunkName: "manifest" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackMode: "lazy" */
  'src/manifest'
);

/** 环境枚举 */
export const enum AppEnv {
  Dev = 'development',
  Sit = 'testing',
  Prod = 'production',
}

const meta = document.querySelector<HTMLMetaElement>('meta[name="version"]');

export const domain = process.env.SERVER_DOMAIN ?? '';

export const prefix = process.env.SERVER_PREFIX ?? '';

/** 环境变量 */
export const env = {
  /** 环境 */
  name: process.env.ENV_NAME as AppEnv,
  /** spa 容器 id */
  root: process.env.CONTAINER_ID,
  /** 项目版本号 */
  version: meta?.content,
};

/** 检查环境变量是否填写 */
Object.entries(omit(env, ['version'])).forEach(([key, val]) => {
  if (!isString(val)) {
    console.error(t('common:Environment variables not found'));
  }
});

const existing = document.querySelector(`#${env.root}`);

const attrs = { id: env.root, classNames: iThemeDefault() };

/** 创建应用容器 */
export const container =
  ifnot(isHTMLElement(existing) && existing) ??
  dom.create('div', attrs, document.body);

container.classList.add(iThemeDefault());

export const i18nInit = async () => {
  const ns: InitOptions['ns'] = ['common'];

  const { i18nResourcesLoad } = await import('./plugins');

  const supportedLngs: InitOptions['supportedLngs'] = ['zh-CN', 'en-US'];

  await i18n
    .use(initReactI18next)
    .use(i18nResourcesLoad)
    .init({
      ns,
      nsSeparator: ':',
      defaultNS: ns[0],
      fallbackNS: ns[0],
      supportedLngs,
      lng: navigator.language,
      fallbackLng: supportedLngs[0],
      interpolation: { escapeValue: false },
    } satisfies InitOptions);

  dayjs.locale(i18n.language.toLocaleLowerCase());
};
