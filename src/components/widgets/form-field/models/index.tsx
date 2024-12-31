import type { OmitOf, PartialPick } from '@busymango/utils';

import type { ReactWrapProps } from '@/models';

import type {
  ControlPattern,
  ControlUIDirection,
  ControlUISize,
  ControlUIStatus,
} from '../../control';
import type { IFlexProps } from '../../flex/models';

export type IFieldGridMode =
  | ControlUIDirection
  | 'between'
  | 'single'
  | 'double'
  | 'triple'
  | 'quadruple';

export interface IFieldCellProps
  extends OmitOf<ReactWrapProps, 'title' | 'children'> {
  /** 字段标题对齐方式 */
  align?: IFlexProps['align'];
  /** 是否开启外间距 */
  margin?: boolean | 'feedback';
  /** 是否显示必填标识 */
  required?: boolean;
  /** 是否强制渲染标题元素，如果为true，即使title不存在也会占用空间 */
  forceRenderTitle?: boolean;
  /** 字段布局模式 */
  mode?: IFieldGridMode;
  /** 当前字段占据多少列 */
  column?: 1 | 2 | 3 | 4;
  /** 是否偏移当前字段所在列 */
  offset?: 1 | 2 | 3 | 4;
  /** 字段额外占据的列 */
  occupy?: 1 | 2 | 3 | 4;
  /** 警告信息 */
  note?: React.ReactNode;
  /** 冒号元素 */
  colon?: React.ReactNode;
  /** 字段标题 */
  title?: React.ReactNode;
  /** 错误信息 */
  feedback?: React.ReactNode;
  /** 字段描述 */
  description?: React.ReactNode;
  /** 字段绝对路径（浏览器通过此属性查询字段Dom位置） */
  address?: string;
  /** 字段交互方式 */
  pattern?: ControlPattern;
  /** 字段校验状态 */
  status?: ControlUIStatus;
  /** 字段UI大小 */
  size?: ControlUISize;
}

export interface IFieldGridContextVal
  extends PartialPick<
    IFieldCellProps,
    'size' | 'colon' | 'mode' | 'margin' | 'forceRenderTitle' | 'align'
  > {}

export interface IFieldGridProps extends IFlexProps, IFieldGridContextVal {
  /** 是否响应区域宽度以决定布局模式 */
  responsive?: boolean;
}
