import type { IServerModel } from './common';

/** 系统用户信息 */
export type IUserModel = {
  /** 用户ID */
  id: string;
  /** 用户姓名 */
  name: string;
  /** 用户类型 */
  type?: string;
  /** 用户编码 */
  code?: string;
  /** 用户邮箱 */
  email?: string;
  /** 用户是否在职 */
  vaildFlag?: 'Y' | 'N';
  /** 用户角色 */
  roleCodeList?: string[];
};

/** 用户信息响应体 */
export interface IUserInfoBody extends IServerModel<IUserModel> {}
