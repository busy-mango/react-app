import { isNil } from '@busymango/is-esm';

export type RecipeModel<T> = T | ((cur: T) => T);

export function iCompact<T = unknown>(source: (T | null | undefined)[]): T[] {
  return source.filter((e) => !isNil(e)) as T[];
}
