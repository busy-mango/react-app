/**
 * @description 公共配置
 */

import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';

import { assign, compact } from '@busymango/utils';
import { parse } from '@dotenvx/dotenvx';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import type { RspackPluginFunction, RspackPluginInstance } from '@rspack/core';
import { rspack } from '@rspack/core';
import ReactRefreshRspackPlugin from '@rspack/plugin-react-refresh';

import { app, dir } from '../project';

type RspackPlugin =
  | 0
  | ''
  | null
  | false
  | undefined
  | RspackPluginInstance
  | RspackPluginFunction;

const { DefinePlugin, ProgressPlugin, HtmlRspackPlugin, CopyRspackPlugin } =
  rspack;

const doctor = new RsdoctorRspackPlugin({
  supports: { generateTileGraph: true },
  linter: { rules: { 'ecma-version-check': 'off' } },
});

export const iPlugins = (
  env: 'dev' | 'test' | 'prod' = 'dev'
): RspackPlugin[] =>
  compact([
    new HtmlRspackPlugin({
      title: app.name,
      publicPath: '/',
      excludedChunks: ['mfeBBB'],
      favicon: './assets/favicon.svg',
      template: './assets/index.html',
      templateParameters: {
        title: app.name,
        version: app.version,
      },
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(
        assign(
          process.env,
          parse(readFileSync(resolve(dir.envs, 'common.env'))),
          parse(readFileSync(resolve(dir.envs, 'dev.env')))
        )
      ),
    }),
    new ProgressPlugin(),
    new ForkTSCheckerWebpackPlugin({
      typescript: {
        build: env !== 'dev',
        mode: 'write-references',
      },
    }) as unknown as null,
    env === 'test' && doctor,
    env !== 'dev' &&
      new CopyRspackPlugin({
        //`assets`下的所有文件夹复制到`dist`中
        patterns: compact(
          readdirSync(dir.static, {
            withFileTypes: true,
          }).map((dirent) => {
            const { name } = dirent;
            if (dirent.isDirectory()) {
              return {
                force: false,
                to: resolve(dir.dist, name),
                from: resolve(dir.static, name),
              };
            }
          })
        ),
      }),
    env === 'dev' && new ReactRefreshRspackPlugin({}),
  ]);
