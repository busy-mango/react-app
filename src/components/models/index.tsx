import type React from 'react';

import type { ReactInputProps } from '@/models';

/** 控件大小 */
export type ControlUISize = 'mini' | 'medium' | 'huge';

/** 控件排版方向 */
export type ControlUIDirection = 'horizontal' | 'vertical';

/** 控件交互方式 */
export type ControlUIPattern =
  | 'disabled'
  | 'editable'
  | 'readOnly'
  | 'readPretty';

/** 控件校验状态 */
export type ControlValidationStatus =
  | 'vaildating'
  | 'error'
  | 'warning'
  | 'success';

export type ControlValue = ReactInputProps['value'] | null;

export type ControlOptionModel = {
  value: React.Key;
  label?: React.ReactNode;
  title?: string;
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
