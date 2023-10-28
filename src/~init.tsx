/**
 * @author 徐子梁
 * @description 应用初始化
 */

import { dom } from '@busymango/utils';
import Cookie from 'js-cookie';
import dayjs from 'dayjs';

import { caniuse } from './~caniuse';

import 'dayjs/locale/zh-cn';
import { isNonEmptyString } from '@busymango/is-esm';

dayjs.locale('zh-cn');

/** 浏览器兼容性检查 */
if (!caniuse.test(navigator.userAgent)) {
  throw new Error('暂不支持当前版本浏览器');
}

/** 环境枚举 */
export const enum AppEnv {
  Dev = 'development',
  Prod = 'production',
}

const meta = document.querySelector<HTMLMetaElement>(
  'meta[name="version"]',
);

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
export const style = dom.create('link', {
  href: `themes/${theme.default}.css`,
  title: theme.title!,
  rel: 'stylesheet',
}, document.head);

/** 创建应用容器 */
export const container = dom.create('div', {
  id: env.root!,
  class: theme.default,
}, document.body);
