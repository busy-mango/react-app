/** HTML元素尺寸 */
export type RectSize = {
  width?: number;
  height?: number;
};

/** HTML 元素事件监听器 */
export type HTMLEventListener<T extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[T]
) => void;
