import { isArray } from '@busymango/is-esm';

export function toArray<T = unknown>(source: T[] | T) {
  return isArray(source) ? source : [source];
}
