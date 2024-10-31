import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import type { ReactRender, ReactWrapProps } from '@/models';

export type IVirtualizerItemWrap = React.ForwardRefExoticComponent<
  ReactWrapProps &
    Omit<VirtualItem, 'key'> &
    React.RefAttributes<HTMLDivElement>
>;

export type IVirtualizerItemRender = ReactRender<
  VirtualItem,
  Pick<
    Virtualizer<HTMLElement, HTMLElement>,
    'measure' | 'measureElement' | 'scrollToIndex' | 'getOffsetForIndex'
  > & {
    Container: IVirtualizerItemWrap;
  }
>;

export interface IVirtualizerProps<T> extends ReactWrapProps {
  estimateSize: (index: number) => number;
  overscan?: number;
  gap?: number;
  /**
   * 选项
   */
  data?: T[];
  /**
   * 选项渲染方法
   */
  render: IVirtualizerItemRender;
}
