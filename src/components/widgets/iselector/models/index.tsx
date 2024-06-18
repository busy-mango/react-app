import type { CSSProperties } from 'react';

import type { OmitOf } from '@busymango/utils';
import type { ReferenceType } from '@floating-ui/react';

import type {
  ControlOptionModel,
  ControlUIPattern,
  ControlValue,
} from '@/components/models';
import type { WrapperProps } from '@/models';

import type { IFieldWrapProps } from '../../iform-field-wrap';
import type { IInputProps } from '../../iinput';

export interface IOptionRender {
  (
    option: ControlOptionModel,
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
  options?: ControlOptionModel[];
  /**
   * 选中的值
   */
  value?: React.Key[] | React.Key;
  /**
   * 容器最大高度
   */
  maxHeight?: CSSProperties['maxHeight'];
  /**
   * 选项渲染方法
   */
  render: IOptionRender;
  /**
   * 选择菜单项时触发的回调。
   */
  onChange?: (value?: React.Key[] | React.Key) => void;
}

export interface ISelectorPredicate {
  (option: ControlOptionModel, keyword?: string): boolean;
}

export type ISelectorRef = {
  floating: React.MutableRefObject<ReferenceType | null>;
  reference: React.MutableRefObject<ReferenceType | null>;
};

export interface ISelectorProps
  extends Pick<
      IFieldWrapProps,
      'suffix' | 'prefix' | 'isLoading' | 'variant' | 'size' | 'status'
    >,
    Pick<IInputProps, 'placeholder' | 'onFocus' | 'onBlur'>,
    OmitOf<
      WrapperProps,
      'onChange' | 'defaultValue' | 'onFocus' | 'onBlur' | 'prefix'
    >,
    Pick<
      ScrollableProps,
      'maxHeight' | 'options' | 'multiple' | 'value' | 'onChange' | 'measure'
    > {
  /**
   * 是否默认获取焦点
   */
  autoFocus?: boolean;
  clear?: React.ReactNode;
  /**
   * 默认选中的值
   */
  defaultValue?: React.Key[] | React.Key;
  /**
   * 控制下拉选单是否展开，如果为`true`则显示下拉选单
   */
  open?: boolean;
  /**
   * 控制搜索文本
   */
  keyword?: string;
  /**
   * 是否过滤选项
   */
  filter?:
    | {
        /** 过滤方式 */
        predicate?: ISelectorPredicate;
        /** 是否排序过滤结果 */
        compare?: ((cur: ControlValue, pre: ControlValue) => number) | boolean;
      }
    | boolean;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   * @param reference 参数元素引用
   * @returns HTMLElement
   */
  iFloatingRoot?: (
    reference: React.MutableRefObject<ReferenceType | null>
  ) =>
    | HTMLElement
    | React.MutableRefObject<HTMLElement | null>
    | null
    | undefined;
  /**
   * 浮层样式
   */
  iFloatingClassName?: string;
  /**
   * 是否默认打开
   */
  initialOpen?: boolean;
  /**
   * 分隔符
   */
  separator?: React.ReactNode;
  /**
   * 控件交互状态
   */
  pattern?: ControlUIPattern;
  /**
   * 控件render方法
   */
  render?: {
    chip?: IOptionRender;
    option?: IOptionRender;
    scrollable?: (params: ScrollableProps) => React.ReactNode;
  };
  // onScroll
  // onSelect
  onSearch?: (value?: string) => void;
  onOpenChange?: (open?: boolean) => void;
}