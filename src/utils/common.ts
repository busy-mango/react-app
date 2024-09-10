import { isNil } from '@busymango/is-esm';

export type WrapperDirectionType = 'inline' | 'vertical' | 'horizontal';

export function iCompact<T = unknown>(source: (T | null | undefined)[]): T[] {
  return source.filter((e) => !isNil(e)) as T[];
}
