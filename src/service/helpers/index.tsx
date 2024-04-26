import { isNil, isPlainObject } from '@busymango/is-esm';
import { compact, keyBy, omit } from '@busymango/utils';

import { domain, prefix } from '@/init';

export function iSrc(api: string) {
  return compact([domain, prefix, api]).join('');
}

export function iSearchParams(params: unknown) {
  if (isPlainObject(params)) {
    const source = Object.entries(omit(params, isNil));

    return new URLSearchParams(
      keyBy(
        source,
        ([key]) => key,
        ([_, value]) => value?.toString?.() as string
      )
    );
  }
}
