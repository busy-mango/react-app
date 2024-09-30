import type { ReactTargetFunc } from '@/models';

import type { IOverlayProps } from '../../overlay';

export interface IBackdropProps extends IOverlayProps {
  open?: boolean;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   */
  root?: ReactTargetFunc;
}
