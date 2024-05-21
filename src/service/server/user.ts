import { SYSTEM_USER_INFO_API } from '../apis';
import { drive } from '../drive';
import { iSearchParams, iServerData, iSrc } from '../helpers';
import type { IUserInfoBody } from '../models';

/** 根据用户ID获取用户信息 */
export const info = (id?: string) =>
  iServerData(
    drive<IUserInfoBody>(iSrc(SYSTEM_USER_INFO_API), iSearchParams({ id }))
  );
