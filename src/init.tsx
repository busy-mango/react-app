/**
 * @description 应用初始化
 */

import { initReactI18next } from 'react-i18next';
import dayjs from 'dayjs';
import type { InitOptions } from 'i18next';
import i18n, { t } from 'i18next';

import { isNonEmptyString } from '@busymango/is-esm';
import { dom } from '@busymango/utils';

import { i18nResourcesLoad } from './plugins';
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
Object.values(env).forEach((val) => {
  if (!isNonEmptyString(val)) {
    throw new Error(t('common:Environment variables not found'));
  }
});

/** 创建应用容器 */
export const container = dom.create(
  'div',
  {
    id: env.root,
    class: iThemeDefault(),
  },
  document.body
);

export const domain = process.env.SERVER_DOMAIN ?? '';

export const prefix = process.env.SERVER_PREFIX ?? '';

export const i18nInit = async () => {
  const ns: InitOptions['ns'] = ['common'];

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
