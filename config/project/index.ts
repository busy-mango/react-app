/**
 * @description 项目配置
 */

import { resolve } from 'path';

import { expands, iCalcSHA, iGitSHA } from '../../helpers';

const { PWD, INIT_CWD } = process.env;
const { npm_package_name: name } = process.env;
const { npm_package_version: version } = process.env;

const cwd = process.cwd() ?? INIT_CWD ?? PWD;

if (typeof cwd !== 'string') {
  throw new Error("can't find dirname");
}

/** 项目所在路径 */
export const dirname = cwd;

/** 默认路径 */
export const dir = {
  src: resolve(dirname, 'src'),
  /** 默认打包路径 */
  dist: resolve(dirname, 'dist'),
  /** 默认 环境变量 路径 */
  envs: resolve(dirname, 'envs'),
  /** 默认 config 路径 */
  conf: resolve(dirname, 'config'),
  /** 默认 静态资源 路径 */
  static: resolve(dirname, 'assets'),
  /** 默认 package.json 所在路径 */
  package: resolve(dirname, 'package.json'),
  /** 默认 tsconfig 所在路径 */
  tsconfig: resolve(dirname, 'tsconfig.json'),
  /** 默认 browserslistrc 所在路径 */
  browserslistrc: resolve(dirname, '.browserslistrc'),
};

/** 所有配置文件路径 */
export const dirconfs = [dir.package, dir.tsconfig, ...expands(dir.conf)];

/** 当前应用基本信息 */
export const app = {
  /** 名称 */
  name: name ?? '',
  /** 项目版本 */
  version: [
    version,
    (
      iGitSHA() ??
      iCalcSHA([
        dir.src,
        dir.envs,
        dir.conf,
        dir.static,
        dir.package,
        dir.tsconfig,
        dir.browserslistrc,
      ])
    ).slice(0, 8),
  ].join('.'),
};
