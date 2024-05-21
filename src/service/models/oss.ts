import type { IServerModel } from './common';

/** 对象存储要素 */
export type OSSInfoModel = {
  /** 主键 */
  id: string;
  /** Hash值 */
  md5: string;
  /** 文件名称 */
  name: string;
  /** 文件实际存储路径 */
  path: string;
  /** 文件大小 */
  size: number;
  /** 文件状态 */
  status: string;
  /** 文件后缀 */
  mimeType: string;
  /** 文件存储类型 */
  storageType: 'IOBS' | 'NAS';
  /** 文件上传时间 */
  createdDate?: string;
  /** 文件上传人 */
  createdBy?: string;
};

export interface OSSInfoBody extends IServerModel<OSSInfoModel> {}
