import type React from 'react';
import type { FocusEvent } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

import type { ReactInputProps } from '@/models';

/** 控件大小 */
export type ControlUISize = 'mini' | 'medium' | 'huge';

/** 控件排版方向 */
export type ControlUIDirection = 'horizontal' | 'vertical';

/** 控件交互方式 */
export type ControlPattern =
  | 'disabled'
  | 'editable'
  | 'readOnly'
  | 'readPretty';

/** 控件校验状态 */
export type ControlUIStatus = 'vaildating' | 'error' | 'warning' | 'success';

export type ControlValue = ReactInputProps['value'] | null;

export type ControlOption = {
  value: React.Key;
  title?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
} & Pick<React.CSSProperties, 'color'>;

export interface InteractionProps {
  ref: (node: HTMLElement | SVGElement | null) => void;
  onBlur?(e: React.FocusEvent): void;
  onFocus?(e: React.FocusEvent): void;
  onClick?(e: React.MouseEvent): void;
  onKeyUp?(e: React.KeyboardEvent): void;
  onKeyDown?(e: React.KeyboardEvent): void;
  onMouseDown?(e: React.MouseEvent): void;
  onMouseMove?(e: React.MouseEvent): void;
  onPointerDown?(e: React.UIEvent): void;
  onPointerEnter?(e: React.UIEvent): void;
}

export type IControlVariant = 'filled' | 'standard' | 'bordered';

export interface IControlWrapProps
  extends React.PropsWithChildren,
    OmitOf<HTMLMotionProps<'div'>, 'prefix' | 'children'> {
  status?: ControlUIStatus;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  suffixClickable?: boolean;
  size?: ControlUISize;
  pattern?: ControlPattern;
  isLoading?: boolean;
  /** 变体 */
  variant?: IControlVariant;
  onPrefixClick?: React.MouseEventHandler<HTMLDivElement>;
  onSuffixClick?: React.MouseEventHandler<HTMLDivElement>;
}
