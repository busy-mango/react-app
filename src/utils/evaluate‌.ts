/* eslint-disable @typescript-eslint/no-implied-eval */
import type { PlainObject } from '@busymango/is-esm';

export const evaluate = (() => (scope: PlainObject, statement: string) => {
  const deconstruction = Object.keys(scope).join(', ');
  try {
    return new Function(
      'scope',
      [`const { ${deconstruction} } = scope;`, `return ${statement}`].join('\n')
    )(scope) as unknown;
  } catch (error) {
    console.error('evaluate excute failed:\n\t', statement);
  }
})();
