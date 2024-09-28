import { writeFileSync } from 'fs';
import { join } from 'path';
import type { ChildNode } from 'postcss';
import { parse } from 'postcss';

import { isNonEmptyArray } from '@busymango/is-esm';
import { dedup } from '@busymango/utils';
import type { Compiler, RspackPluginInstance } from '@rspack/core';

type PluginOptions = {
  dirname: string;
  filename?: string;
  includes?: string[];
};

const PLUGIN_NAME = 'CSSVarTSEmitPlugin';

const iTemp = (names: string[]) => `import 'react';\n
type CSSVarModel = {
  ${names.map((name) => `'${name}'?: string;`).join(`\n${' '.repeat(2)}`)}
};\n
declare module 'react' {
  export type CSSVarProps = CSSVarModel;
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

    hooks.emit.tap(PLUGIN_NAME, (compilation) => {
      const names: string[] = [];

      const recursion = (node: ChildNode) => {
        if (node.type === 'rule') {
          node.nodes?.forEach((node) => {
            if (node.type === 'decl' && node.variable) {
              names.push(node.prop);
            }
          });
        }
        if (node.type === 'atrule') {
          node.nodes?.forEach(recursion);
        }
      };

      includes?.forEach((name) => {
        const selector = `themes\\${name}`;
        const asset = compilation.getAsset(selector);
        const source = asset?.source.source().toString();
        (source ? parse(source) : null)?.nodes?.forEach(recursion);
      });

      if (isNonEmptyArray(names)) {
        writeFileSync(join(dirname, filename), iTemp(dedup(names)));
      }
    });
  }
}
