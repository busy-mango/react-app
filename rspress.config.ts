import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'rspress/config';

import { assign } from '@busymango/utils';
import { parse } from '@dotenvx/dotenvx';
import { pluginPreview } from '@rspress/plugin-preview';

import { dir } from './config';

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
  plugins: [pluginPreview()],
  globalStyles: join(dir.static, 'themes/dark.css'),
  builderConfig: {
    source: {
      define: {
        'process.env': JSON.stringify(dotenv),
      },
    },
    output: {
      cssModules: {
        mode: 'local',
        namedExport: true,
        exportGlobals: true,
        exportLocalsConvention: 'camelCaseOnly',
        auto: (resource) => resource.includes('/src/'),
      },
    },
  },
});
