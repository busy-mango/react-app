import type { RefObject } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';
import type { ReferenceType } from '@floating-ui/react';

import type {
  ReactInputProps,
  ReactRender,
  ReactTargetFunc,
  ReactWrapProps,
} from '@/models';

import type {
  ControlOption,
  ControlPattern,
  ControlValue,
  IControlWrapProps,
} from '../../control';
import type { IEmptyWrapProps } from '../../empty';
import type { IInputProps } from '../../input';
import type { IMenuProps, IMenuRef } from '../../menu';

export type ISelectorState = Pick<
  IControlWrapProps,
  'suffix' | 'prefix' | 'isLoading' | 'variant' | 'size' | 'status'
> & {
  /**
   * 控件是否呈现清空按钮。
   */
  clearable?: boolean;
  /**
   * 控件是否处于聚焦状态
   */
  isFocus?: boolean;
  /**
   * 控件是否处于悬浮状态
   */
  isHover?: boolean;
  /**
   * 检索关键字
   */
  keyword?: string;
  /**
   * 是否开启多选
   */
  multiple?: boolean;
  /**
   * 控制下拉选单是否展开，如果为`true`则显示下拉选单
   */
  open?: boolean;
  /**
   * 控件交互状态
   */
  pattern?: ControlPattern;
  /**
   * 选中的值
   */
  value?: React.Key[] | React.Key | null;
};

export type ISelectorChipRender = ReactRender<
  {
    option?: ControlOption;
    onClose?: () => void;
  },
  ISelectorState
>;

export type ISelectorOptionRender = ReactRender<
  {
    index: number;
    className: string;
    isActive: boolean;
    isSelected: boolean;
    option: ControlOption;
  },
  ISelectorState
>;

export type ISelectorEmptyRender = ReactRender<IEmptyWrapProps, ISelectorState>;

export type ISelectorSearchRender = ReactRender<
  ReactInputProps & {
    ref: RefObject<HTMLInputElement>;
  },
  ISelectorState
>;

export type ISelectorScrollableRender = ReactRender<
  IMenuProps & {
    ref: React.RefObject<IMenuRef>;
  },
  ISelectorState
>;

export type ISelectorRootRender = ReactRender<
  OmitOf<HTMLMotionProps<'div'>, 'prefix' | 'onChange'> & {
    ref: (node: HTMLDivElement | null) => void;
    chips?: React.ReactNode;
    search?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    onChange?: (current?: React.Key | React.Key[]) => void;
  },
  ISelectorState
>;

interface ISelectorRenders {
  /** 根元素渲染方法 */
  root?: ISelectorRootRender;
  /** 选中项的渲染方法 */
  chip?: ISelectorChipRender;
  /** 空数据渲染方法 */
  empty?: ISelectorEmptyRender;
  /** 检索区渲染方法 */
  search?: ISelectorSearchRender;
  /** 选项的渲染方法 */
  option?: ISelectorOptionRender;
  /** 下拉菜单的渲染方法 */
  scrollable?: ISelectorScrollableRender;
}

export interface ISelectorPredicate {
  (option: ControlOption, keyword?: string): boolean;
}

export type ISelectorRef = {
  input?: HTMLInputElement | null;
  floating: React.MutableRefObject<ReferenceType | null>;
  reference: React.MutableRefObject<ReferenceType | null>;
};

export interface ISelectorFilterParams {
  /** 过滤方式 */
  predicate?: ISelectorPredicate;
  /** 是否排序过滤结果 */
  compare?: ((cur: ControlValue, pre: ControlValue) => number) | boolean;
}

export interface QueryFloatingRootFunc {
  (
    reference: React.MutableRefObject<ReferenceType | null>
  ): ReturnType<ReactTargetFunc> | undefined;
}

export interface ISelectorProps
  extends OmitOf<ISelectorState, 'isFocus' | 'isHover'>,
    OmitOf<ReactWrapProps, 'onFocus' | 'onBlur' | 'prefix' | 'onScroll'>,
    Pick<IInputProps, 'placeholder' | 'onFocus' | 'onBlur' | 'autoFocus'>,
    Pick<
      IMenuProps,
      | 'maxHeight'
      | 'options'
      | 'multiple'
      | 'value'
      | 'onChange'
      | 'measure'
      | 'onScroll'
      | 'onSelect'
    > {
  /**
   * 控件默认选中的值。
   */
  defaultValue?: React.Key[] | React.Key;
  /**
   * 控件选项过滤配置。
   */
  filter?: ISelectorFilterParams | boolean;
  /**
   * 控件浮层样式。
   */
  iFloatingClassName?: string;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   */
  iFloatingRoot?: QueryFloatingRootFunc;
  /**
   * 是否默认打开
   */
  initialOpen?: boolean;
  /**
   * 分隔符
   */
  separator?: React.ReactNode;
  /**
   * 控件render方法
   */
  render?: ISelectorRenders;
  /** 搜索值变更回调 */
  onSearch?: (value?: string) => void;
  /**
   * 控件浮层选单展开、收起时触发的回调。
   */
  onOpenChange?: (open?: boolean) => void;
}
