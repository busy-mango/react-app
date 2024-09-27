import { writeFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'postcss';

import type { Compiler, RspackPluginInstance } from '@rspack/core';

type PluginOptions = {
  dirname: string;
  filename?: string;
  includes?: string[];
};

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

    hooks.emit.tap('MyPlugin', (compilation) => {
      const names: string[] = [];

      includes?.forEach((name) => {
        const selector = `themes\\${name}`;
        const asset = compilation.getAsset(selector);
        const source = asset?.source.source().toString();
        (source ? parse(source) : null)?.nodes?.forEach((node) => {
          if (node.type === 'rule') {
            node.nodes?.forEach((node) => {
              if (node.type === 'decl' && node.variable) {
                names.push(node.prop);
              }
            });
          }
        });
      });

      writeFileSync(join(dirname, filename), iTemp(names));
    });
  }
}
