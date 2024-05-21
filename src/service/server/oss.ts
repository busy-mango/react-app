import { OSS_INFO_API } from '../apis';
import { drive } from '../drive';
import { iSearchParams, iServerData, iSrc } from '../helpers';
import type { OSSInfoBody } from '../models/oss';

/** 根据ID获取附件详情 */
export const info = (id: string) =>
  iServerData(drive<OSSInfoBody>(iSrc(OSS_INFO_API), iSearchParams({ id })));
