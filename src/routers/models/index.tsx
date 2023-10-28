/**
 * @author 徐子梁
 * @description type/model define
 */

import { ReactAction } from '@models/index';

export type ComponentType = React.ComponentType<unknown>;

export interface DynamicImportFunc {
  (path: string): Promise<{
    default: React.ComponentType<unknown>;
  }>;
}

export interface SuspenseContextVal {
  /** 页面是否开始请求 */
  isLoadable: boolean;
  setLoadable: ReactAction<boolean>;
  /** 页面是否已经请求完成 */
  isComplete: boolean;
  setComplete: ReactAction<boolean>;
}
