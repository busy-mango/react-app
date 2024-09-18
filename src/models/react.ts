/**
 * @description My React Type Define
 */

import type { PlainObject } from '@busymango/is-esm';

/** HTML元素尺寸 */
export type RectSize = {
  width?: number;
  height?: number;
};

/** React通用渲染方法 */
export interface ReactRender<P = PlainObject, S = never> {
  (props: P, state: S): React.ReactNode;
}

/** React SetStateAction */
export type ReactAction<T> = React.Dispatch<React.SetStateAction<T>>;

/** React MutableRefObject */
export type ReactRefObject<T = HTMLElement> = React.MutableRefObject<T | null>;

/** React SVG component props */
export type ReactSvgProps = React.SVGProps<SVGSVGElement>;

/** React function component type */
export type ReactComponentType<T = unknown> = React.ComponentType<T>;

/** React component webpack dymaic import type */
export type ReactComponentAsync<T = unknown> = {
  default: ReactComponentType<T>;
};

/** React css color type */
export type ReactCSSColor = React.CSSProperties['color'];

/** React wrap props */
export type ReactWrapProps<T extends HTMLElement = HTMLElement> =
  React.HTMLAttributes<T>;

/** React native button props */
export type ReactButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** React native input props */
export type ReactInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** React native form props */
export type ReactFormProps = React.FormHTMLAttributes<HTMLFormElement>;

/** React FC with children */
export type ReactCFC<T = unknown> = React.FC<React.PropsWithChildren<T>>;

/** React target ref function */
export interface ReactTargetFunc {
  (): ReactRefObject<HTMLElement> | HTMLElement | null;
}

/** React target ref type */
export type ReactTargetType = ReactTargetFunc | ReturnType<ReactTargetFunc>;
