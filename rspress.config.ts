import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'rspress/config';

import { isObject, isRegExp } from '@busymango/is-esm';
import type { FalseValue } from '@busymango/utils';
import { assign, or } from '@busymango/utils';
import { parse } from '@dotenvx/dotenvx';
import type { RuleSetRule } from '@rspack/core';
import { pluginPreview } from '@rspress/plugin-preview';

import { dir } from './config';

const isRuleSetRule = (
  rule: FalseValue | '...' | RuleSetRule
): rule is RuleSetRule => isObject(rule);

const dotenv = assign<{
  THEME: string;
  ENV_NAME: string;
  CONTAINER_ID: string;
  SERVER_DOMAIN?: string;
  SERVER_PREFIX?: string;
}>(
  process.env,
  parse(readFileSync(resolve(dir.envs, 'comm.env'))),
  parse(readFileSync(resolve(dir.envs, `prod.env`)))
);

export default defineConfig({
  root: 'docs',
  base: '/react-app/',
  icon: '/favicon.svg',
  logo: '/mango.png',
  logoText: 'react-app',
  plugins: [pluginPreview()],
  globalStyles: join(dir.docs, 'index.css'),
  globalUIComponents: [join(dir.docs, 'index.tsx')],
  route: { exclude: ['utils/**/*', 'widgets/**/*'] },
  builderConfig: {
    source: {
      define: {
        'process.env': JSON.stringify(dotenv),
      },
    },
    tools: {
      rspack: (config) => {
        config.module?.rules
          ?.filter(isRuleSetRule)
          ?.find(({ test }) => isRegExp(test) && test.test('.svg'))
          ?.oneOf?.unshift({
            loader: '@svgr/webpack',
            resourceQuery: /react/,
            options: { icon: false, typescript: true },
          });

        config.plugins?.push(
          new ForkTsCheckerWebpackPlugin({
            typescript: {
              build: config.mode !== 'development',
              mode: 'write-references',
            },
          })
        );

        return config;
      },
    },
    output: {
      cleanDistPath: true,
      cssModules: {
        mode: 'local',
        namedExport: true,
        exportGlobals: true,
        exportLocalsConvention: 'camelCaseOnly',
        auto: (res) =>
          res.endsWith('.scss') &&
          or(['src', 'docs', 'examples'], (val) => res.includes(val)),
      },
    },
  },
});
