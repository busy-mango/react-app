/**
 * @description My React Type Define
 */

import type { AnimationDefinition, PanInfo } from 'framer-motion';

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
export type WrapperProps<T extends Element = Element> = React.HTMLAttributes<T>;

/** React native input props */
export type ReactInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

/** React native props */
export type ReactButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/** React FC with children */
export type ReactCFC<T = unknown> = React.FC<React.PropsWithChildren<T>>;

/** React target ref function */
export interface ReactTargetFunc {
  (): ReactRefObject<HTMLElement> | HTMLElement | null;
}

/** React target ref type */
export type ReactTargetType = ReactTargetFunc | ReturnType<ReactTargetFunc>;

/** React framer motion UI event */
export type ReactMotionEvent = {
  onAnimationStart?: (definition: AnimationDefinition) => void;
} & Partial<
  Record<
    'onDrag' | 'onDragEnd' | 'onDragStart',
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  >
>;

/** React framer motion dom props */
export type ReactMotionDomProps<
  T extends React.DetailedHTMLProps<React.HTMLAttributes<unknown>, Element>,
> = ReactMotionEvent &
  Omit<T, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'>;
