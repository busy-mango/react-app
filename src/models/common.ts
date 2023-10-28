/**
 * @author 徐子梁
 */

/** React SetStateAction */
export type ReactAction<T> = React.Dispatch<
  React.SetStateAction<T>
>;

/** React MutableRefObject */
export type ReactRef = React.MutableRefObject<HTMLElement | null>;
