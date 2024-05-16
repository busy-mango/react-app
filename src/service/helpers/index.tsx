import { isNil, isPlainObject } from '@busymango/is-esm';
import { compact, keyBy, omit } from '@busymango/utils';

import { domain, prefix } from '@/init';
import { catchMsg } from '@/utils';

import type { IServerModel } from '../models';

export function iSrc(api: string) {
  return compact([domain, prefix, api]).join('');
}

export async function iServerData<T = unknown>(
  promise: Promise<IServerModel<T>>
) {
  const current = await promise;
  if (current.success) return current.data;
  throw new Error(catchMsg(current.message));
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
