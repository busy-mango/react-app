import { iSearchParams } from '@busymango/utils';

import { GITHUB_USER_INFO_API } from '../apis';
import { drive } from '../drive';
import { iServerData, iSrc } from '../helpers';
import type { GithubUserInfo, IServerModel } from '../models';

export interface GithubUserInfoBody extends IServerModel<GithubUserInfo> {}

export const userinfo = () =>
  iServerData(
    drive<GithubUserInfoBody>(iSrc(GITHUB_USER_INFO_API), iSearchParams({}), {
      credentials: 'include',
    })
  );
