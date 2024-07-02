/**
 * @description 应用初始化
 */

import dayjs from 'dayjs';
import Cookie from 'js-cookie';

import { isNonEmptyString } from '@busymango/is-esm';
import { dom } from '@busymango/utils';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

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
    throw new Error('请检查环境变量文件是否填写');
  }
});

/** 默认从Cookie中获取当前主题样式名称 */
const topic = Cookie.get(process.env.THEME_TITLE);

/** 主题样式变量 */
export const theme = {
  /** 主题样式的 CSSRule title */
  title: process.env.THEME_TITLE,
  /** 默认的主题样式 */
  default: topic ?? process.env.THEME_DEFAULT,
};

// 检查主题样式是否定义
Object.values(theme).forEach((val) => {
  if (!isNonEmptyString(val)) {
    throw new Error('请检查主题样式是否定义');
  }
});

/** 创建主题样式标签 */
export const style = dom.create(
  'link',
  {
    href: `/themes/${theme.default}.css`,
    title: theme.title,
    rel: 'stylesheet',
  },
  document.head
);

/** 创建应用容器 */
export const container = dom.create(
  'div',
  {
    id: env.root,
    class: theme.default,
  },
  document.body
);

export const domain = process.env.SERVER_DOMAIN ?? '';

export const prefix = process.env.SERVER_PREFIX ?? '';
