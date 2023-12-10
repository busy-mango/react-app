import { isObject, isString, isValidKey } from '@busymango/is-esm';

const isStringKey = <T extends string>(
  key: T,
  source: object
): source is Record<T, string> => isValidKey(key, source, isString);

export function catchMsg(error: unknown) {
  if (isString(error)) return error;

  if (isObject(error)) {
    if (isStringKey('msg', error)) return error.msg;
    if (isStringKey('errMsg', error)) return error.errMsg;
    if (isStringKey('message', error)) return error.message;
  }

  return undefined;
}
