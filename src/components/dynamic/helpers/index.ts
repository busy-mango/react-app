import { isNotFoundError } from '@/utils/assert';
import { isFalse } from '@busymango/is-esm';

export function retry(count: number, error: unknown) {
  return isFalse(isNotFoundError(error)) && count < 2;
}
