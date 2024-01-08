/**
 * @description My React Type Define
 */

/** React SetStateAction */
export type ReactAction<T> = React.Dispatch<React.SetStateAction<T>>;

/** React MutableRefObject */
export type ReactRefObject<T = HTMLElement> = React.MutableRefObject<T | null>;

/** React SVG component props */
export type ReactSvgProps = React.SVGProps<SVGAElement>;

/** React function component type */
export type ReactComponentType<T = unknown> = React.ComponentType<T>;

/** React component webpack dymaic import type */
export type ReactComponentAsync<T = unknown> = {
  default: ReactComponentType<T>;
};

/** React css color type */
export type ReactCSSColor = React.CSSProperties['color'];

/** React HTML element props */
export type WrapperProps<T extends HTMLElement = HTMLDivElement> =
  React.HTMLAttributes<T>;

/** React FC with children */
export type ReactComponentFC<T = unknown> = React.FC<
  React.PropsWithChildren<T>
>;

/** React target ref function */
export interface ReactTargetFunc {
  (): ReactRefObject<HTMLElement> | HTMLElement | null;
}

/** React target ref type */
export type ReactTargetType = ReactTargetFunc | ReturnType<ReactTargetFunc>;
