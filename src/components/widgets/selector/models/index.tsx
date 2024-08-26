import type { CSSProperties } from 'react';

import type { OmitOf } from '@busymango/utils';
import type { ReferenceType } from '@floating-ui/react';

import type { ReactTargetFunc, WrapperProps } from '@/models';

import type {
  ControlOption,
  ControlPattern,
  ControlValue,
  IControlWrapProps,
} from '../../control';
import type { IInputProps } from '../../input';

export interface IOptionRender {
  (
    option?: ControlOption,
    params?: {
      multiple?: boolean;
      isActive?: boolean;
      isSelected?: boolean;
      onClose?: () => void;
    }
  ): React.ReactNode;
}

export interface ScrollableRef {
  native: HTMLDivElement;
  select: (index?: number, isSelected?: boolean) => void;
  active: (recipe: (current: number) => number) => void;
}

export interface ScrollableProps {
  /**
   * Whether the floating element has been positioned yet when used inside an Effect (not during render).
   */
  isPositioned: boolean;
  /**
   * 是否测量元素高度（消耗性能，不建议开启）
   */
  measure?: boolean;
  /**
   * 是否开启多选
   */
  multiple?: boolean;
  /**
   * 是否开启多选
   */
  options?: ControlOption[];
  /**
   * 选中的值
   */
  value?: React.Key[] | React.Key;
  /**
   * 容器最大高度
   */
  maxHeight?: CSSProperties['maxHeight'];
  /**
   * 是否展示加载UI
   */
  isLoading?: boolean;
  /**
   * 选项渲染方法
   */
  render: IOptionRender;
  /**
   * 选择菜单项时触发的回调。
   */
  onChange?: (value?: React.Key[] | React.Key) => void;
  /**
   * 点击选项时触发的回调
   */
  onSelect?: (index: number, value?: React.Key[]) => void;
  /**
   * 滚动回调
   */
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

export interface ISelectorPredicate {
  (option: ControlOption, keyword?: string): boolean;
}

export type ISelectorRef = {
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
  extends Pick<IInputProps, 'placeholder' | 'onFocus' | 'onBlur'>,
    Pick<
      IControlWrapProps,
      | 'suffix'
      | 'prefix'
      | 'isLoading'
      | 'variant'
      | 'size'
      | 'status'
      | 'style'
    >,
    OmitOf<
      WrapperProps,
      | 'onChange'
      | 'defaultValue'
      | 'onFocus'
      | 'onBlur'
      | 'prefix'
      | 'onScroll'
      | 'onSelect'
    >,
    Pick<
      ScrollableProps,
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
   * 是否默认获取焦点
   */
  autoFocus?: boolean;
  /**
   * 清除按钮的图标，默认为true显示默认图标，设置false关闭清除按钮
   */
  clear?: React.ReactNode;
  /**
   * 默认选中的值
   */
  defaultValue?: React.Key[] | React.Key;
  /**
   * 选项过滤配置
   */
  filter?: ISelectorFilterParams | boolean;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   * @param reference 参数元素引用
   * @returns HTMLElement
   */
  iFloatingRoot?: QueryFloatingRootFunc;
  /**
   * 浮层样式
   */
  iFloatingClassName?: string;
  /**
   * 是否默认打开
   */
  initialOpen?: boolean;
  /**
   * 控制下拉选单是否展开，如果为`true`则显示下拉选单
   */
  open?: boolean;
  /**
   * 控制搜索文本
   */
  keyword?: string;
  /**
   * 分隔符
   */
  separator?: React.ReactNode;
  /**
   * 控件交互状态
   */
  pattern?: ControlPattern;
  /**
   * 控件render方法
   */
  render?: {
    /** 回填的渲染方法 */
    chip?: IOptionRender;
    /** 选项的渲染方法 */
    option?: IOptionRender;
    /** 下拉菜单的渲染方法 */
    scrollable?: (props: ScrollableProps) => React.ReactNode;
  };
  /** 搜索值变更回调 */
  onSearch?: (value?: string) => void;
  /** 下拉菜单展开/收起事件 */
  onOpenChange?: (open?: boolean) => void;
}
