/**
 * @description 公共配置
 */

import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

import { assign, compact } from '@busymango/utils';
import { parse } from '@dotenvx/dotenvx';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import type {
  RspackPluginFunction,
  RspackPluginInstance,
  WebpackPluginInstance,
} from '@rspack/core';
import { rspack } from '@rspack/core';
import ReactRefreshRspackPlugin from '@rspack/plugin-react-refresh';

import { CSSVarTSEmitPlugin } from '../plugins';
import { app, dir } from '../project';

type RspackPlugin =
  | 0
  | ''
  | null
  | false
  | undefined
  | RspackPluginInstance
  | RspackPluginFunction;

const doctor = new RsdoctorRspackPlugin({
  supports: { generateTileGraph: true },
  linter: { rules: { 'ecma-version-check': 'off' } },
});

export const iPlugins = (
  env: 'dev' | 'test' | 'prod' = 'dev'
): (RspackPlugin | WebpackPluginInstance)[] => {
  const dotenv = assign<{
    THEME: string;
    ENV_NAME: string;
    CONTAINER_ID: string;
    SERVER_DOMAIN?: string;
    SERVER_PREFIX?: string;
  }>(
    process.env,
    parse(readFileSync(resolve(dir.envs, 'comm.env'))),
    parse(readFileSync(resolve(dir.envs, `${env}.env`)))
  );

  return compact([
    new rspack.HtmlRspackPlugin({
      title: app.name,
      publicPath: '/',
      excludeChunks: ['mfeBBB'],
      favicon: './assets/favicon.svg',
      template: './assets/index.html',
      templateParameters: {
        title: app.name,
        version: app.version,
        theme: dotenv.THEME,
      },
    }),
    new rspack.DefinePlugin({
      'process.env': JSON.stringify(dotenv),
    }),
    new rspack.ProgressPlugin(),
    new rspack.CopyRspackPlugin({
      patterns: compact(
        // 将 assets 路径下的所有文件夹复制到 dist 中
        readdirSync(dir.static, { withFileTypes: true }).map(
          (dirent) =>
            dirent.isDirectory() && {
              force: false,
              to: resolve(dir.dist, dirent.name),
              from: resolve(dir.static, dirent.name),
            }
        )
      ),
    }),
    new ForkTSCheckerWebpackPlugin({
      typescript: {
        build: env !== 'dev',
        mode: 'write-references',
      },
    }),
    env === 'test' && doctor,
    env === 'dev' &&
      new CSSVarTSEmitPlugin({
        includes: ['dark.css'],
        dirname: join(dir.src, 'types'),
      }),
    env === 'dev' && new ReactRefreshRspackPlugin({}),
  ]);
};
