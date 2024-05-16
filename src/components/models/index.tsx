/** 控件大小 */
export type ControlUISize = 'mini' | 'normal' | 'huge';

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
