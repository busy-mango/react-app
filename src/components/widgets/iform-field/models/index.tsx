import type { OmitOf } from '@busymango/utils';

import type { ControlDirection, ControlPatternType } from '@/models';

import type { FeedbackStatus } from '../../ifeedback';
import type { IFlexProps } from '../../iflex/models';

export type IFieldGridMode =
  | ControlDirection
  | 'single'
  | 'double'
  | 'triple'
  | 'quadruple';

export interface IFieldGridProps extends IFlexProps {
  mode?: IFieldGridMode;
}

export interface IFieldCellProps extends OmitOf<IFlexProps, 'title'> {
  /** 字段标题对齐方式 */
  align?: 'start' | 'end';
  /** 是否开启外间距 */
  margin?: boolean;
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
  pattern: ControlPatternType;
  /** 字段校验状态 */
  status?: FeedbackStatus;
}
