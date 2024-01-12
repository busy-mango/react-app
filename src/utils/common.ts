import { isArray } from '@busymango/is-esm';

export type WrapperDirectionType = 'inline' | 'vertical' | 'horizontal';

export function toArray<T = unknown>(source: T[] | T) {
  return isArray(source) ? source : [source];
}

export function stopPropagation(event?: React.UIEvent) {
  event?.stopPropagation();
  event?.preventDefault();
}
