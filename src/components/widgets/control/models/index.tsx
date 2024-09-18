import type React from 'react';
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
};

export interface InteractionProps {
  ref: (node: HTMLElement | SVGElement | null) => void;
  onBlur?(): void;
  onFocus?(): void;
  onClick?(): void;
  onKeyUp?(): void;
  onKeyDown?(): void;
  onMouseDown?(): void;
  onMouseMove?(): void;
  onPointerDown?(): void;
  onPointerEnter?(): void;
}

export interface IControlWrapProps
  extends React.PropsWithChildren,
    OmitOf<HTMLMotionProps<'div'>, 'prefix' | 'children'> {
  status?: ControlUIStatus;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  suffixClickable?: boolean;
  size?: ControlUISize;
  isLoading?: boolean;
  /** 变体 */
  variant?: 'filled' | 'standard' | 'bordered';
  onPrefixClick?: React.MouseEventHandler<HTMLDivElement>;
  onSuffixClick?: React.MouseEventHandler<HTMLDivElement>;
}
