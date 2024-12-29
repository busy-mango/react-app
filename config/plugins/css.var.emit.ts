import { writeFileSync } from 'fs';
import { join } from 'path';
import type { ChildNode } from 'postcss';
import { parse } from 'postcss';

import { isNonEmptyArray } from '@busymango/is-esm';
import { dedup } from '@busymango/utils';
import type { Compiler, RspackPluginInstance } from '@rspack/core';

import { isSubdirectory } from '../../helpers';

type PluginOptions = {
  dirname: string;
  filename?: string;
  includes?: string[];
};

const PLUGIN_NAME = 'CSSVarTSEmitPlugin';

const iTemp = (names: string[]) => `import 'react';\n
type CSSVarModel = {
  ${names.map((name) => `'${name}': string;`).join(`\n${' '.repeat(2)}`)}
};\n
declare module 'react' {
  export type CSSVarProps = Partial<CSSVarModel>;
  export interface CSSProperties extends CSSVarProps {}
}
`;

export class CSSVarTSEmitPlugin implements RspackPluginInstance {
  private options: PluginOptions;

  constructor(options: PluginOptions) {
    this.options = options;
  }

  apply({ hooks }: Compiler) {
    const {
      dirname,
      includes,
      filename = 'react.css.vars.d.ts',
    } = this.options;

    hooks.emit.tap(PLUGIN_NAME, async (compilation) => {
      const names: string[] = [];
      const assets = compilation.getAssets();

      const recursion = async (node: ChildNode) => {
        if (node.type === 'rule') {
          node.nodes?.forEach((node) => {
            if (node.type === 'decl' && node.variable) {
              names.push(node.prop);
            }
          });
        }
        if (node.type === 'atrule') {
          await Promise.all(node.nodes?.map(recursion) ?? []);
        }
      };

      await Promise.all(
        assets
          .filter(({ name }) => name.endsWith('.css'))
          .flatMap(({ name, source }) =>
            includes?.map((include) => {
              if (isSubdirectory(name, include)) {
                const { nodes } = parse(source.source());
                return nodes?.map(recursion);
              }
              return [];
            })
          )
      );

      if (isNonEmptyArray(names)) {
        writeFileSync(join(dirname, filename), iTemp(dedup(names)));
      }
    });
  }
}
