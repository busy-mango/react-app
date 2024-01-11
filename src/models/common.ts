/** HTML元素尺寸 */
export type RectSize = {
  width?: number;
  height?: number;
};

/** 控件交互方式 */
export type ControlPatternType =
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

/** 始祖函数 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ConstrainedFunc<T extends (...args: any[]) => ReturnType<T>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): ReturnType<T>;
}
