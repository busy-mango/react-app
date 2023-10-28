import { isNonEmptyString, isObject, isValidKey } from "@busymango/is-esm";

function isStringKey<T extends string>(
  key: T,
  source: object
): source is Record<T, string> {
  return isValidKey(key, source, isNonEmptyString);
}

export function catchMsg(error: unknown) {
  if (isNonEmptyString(error)) {
    return error;
  }

  if (isObject(error)) {
    if (isStringKey('msg', error)) return error.msg;
    if (isStringKey('errMsg', error)) return error.errMsg;
    if (isStringKey('message', error)) return error.message;
  }

  return undefined;
}
