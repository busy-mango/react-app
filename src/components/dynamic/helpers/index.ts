import { isFalse } from '@busymango/is-esm';

import { isNotFoundError } from '@/utils';

export function retry(count: number, error: unknown) {
  return isFalse(isNotFoundError(error)) && count < 2;
}
