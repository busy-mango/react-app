/** HTML 元素事件监听器 */
export type HTMLEventListener<T extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[T]
) => void;
