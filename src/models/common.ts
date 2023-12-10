/** HTML元素尺寸 */
export type RectSize = {
  width?: number;
  height?: number;
};

/** 控件交互方式 */
export type ControlPattern =
  | 'disabled'
  | 'editable'
  | 'readOnly'
  | 'readPretty';

/** 控件校验状态 */
export type ControlVaildateStatus =
  | 'vaildating'
  | 'error'
  | 'warning'
  | 'success';

/** HTML 元素事件监听器 */
export type HTMLEventListener<T extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[T]
) => void;
