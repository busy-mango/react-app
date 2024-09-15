import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'rspress/config';

import { isObject, isRegExp } from '@busymango/is-esm';
import type { FalseValue } from '@busymango/utils';
import { assign } from '@busymango/utils';
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
  // 文档根目录
  root: 'docs',
  icon: './assets/favicon.svg',
  plugins: [pluginPreview()],
  globalStyles: join(dir.static, 'themes/dark.css'),
  globalUIComponents: [join(dir.docs, 'effects.tsx')],
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
        return config;
      },
    },
    output: {
      cssModules: {
        mode: 'local',
        namedExport: true,
        exportGlobals: true,
        exportLocalsConvention: 'camelCaseOnly',
        auto: (res) => res.includes('src') && res.endsWith('.scss'),
      },
    },
  },
});
