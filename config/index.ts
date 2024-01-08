/**
 * @description 项目配置
 */

import fs from 'fs';
import { resolve } from 'path';

const { PWD, INIT_CWD } = process.env;
const { npm_package_name } = process.env;
const { npm_package_version } = process.env;

/**
 * 递归获取目标路径下所有文件的路径
 */
function expands(dirpath?: string): string[] {
  if (!dirpath) return [];
  const names = fs.readdirSync(dirpath);
  return names.flatMap((name) => {
    const cur = resolve(dirpath, name);
    const isDirectory = fs.statSync(cur).isDirectory();
    return isDirectory ? expands(cur) : cur;
  });
}

/** 当前应用基本信息 */
export const app = {
  /** 名称 */
  name: npm_package_name,
  /** 项目版本 */
  version: npm_package_version,
};

const cwd = process.cwd() ?? INIT_CWD ?? PWD;

if (typeof cwd !== 'string') {
  throw new Error("can't find dirname");
}

/** 项目所在路径 */
export const dirname = cwd;

/** 默认路径 */
export const dir = {
  /** 默认打包路径 */
  dist: resolve(dirname, 'dist'),
  /** 默认 config 路径 */
  conf: resolve(dirname, 'config'),
  /** 默认 静态资源 路径 */
  static: resolve(dirname, 'assets'),
  /** 默认 环境变量 路径 */
  env: resolve(dirname, 'config/envs'),
  /** 默认 swc config 文件所在路径 */
  swcrc: resolve(dirname, '.swcrc'),
  /** 默认 package.json 所在路径 */
  package: resolve(dirname, 'package.json'),
  /** 默认 tsconfig 所在路径 */
  tsconfig: resolve(dirname, 'tsconfig.json'),
  /** 默认 browserslistrc 所在路径 */
  browserslistrc: resolve(dirname, '.browserslistrc'),
};

/** 所有配置文件路径 */
export const dirconfs = [
  dir.swcrc,
  dir.package,
  dir.tsconfig,
  ...expands(dir.conf),
];
