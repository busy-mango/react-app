import { isArray, isPlainObject, isString } from '@busymango/is-esm';

export type WrapperDirectionType = 'inline' | 'vertical' | 'horizontal';

export function iArray<T = unknown>(source: T[] | T) {
  return isArray(source) ? source : [source];
}

/** 查询变量长度、大小 */
export const sizeOf = (source: unknown) => {
  if (isArray(source)) return source.length;
  if (isString(source)) return source.length;
  if (source instanceof Map) return source.size;
  if (source instanceof Set) return source.size;
  if (isPlainObject(source)) return Object.keys(source).length;
  return 0;
};
