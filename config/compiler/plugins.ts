/**
 * @description 公共配置
 */

import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { assign } from '@busymango/utils';
import { parse } from '@dotenvx/dotenvx';
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

const { DefinePlugin, ProgressPlugin, HtmlRspackPlugin } = rspack;

export const iPlugins = (
  env: 'dev' | 'mock' | 'prod' | 'sit' = 'dev'
): RspackPlugin[] => [
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
  new ForkTSCheckerWebpackPlugin() as unknown as null,
  env === 'dev' && new ReactRefreshRspackPlugin({}),
];
