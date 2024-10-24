import type { ReactWrapProps } from '@/models';

export type ITypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'inherit'
  | 'subtitle';

export type ITypographyColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'disabled';

export type ITypographyElement = HTMLHeadingElement & HTMLParagraphElement;

export type ITypographyAlign = React.CSSProperties['textAlign'];

export interface ITypographyProps extends ReactWrapProps {
  maxRow?: number;
  align?: ITypographyAlign;
  color?: ITypographyColor;
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  margin?:
    | boolean
    | {
        left?: boolean;
      };
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  wrap?: boolean;
  /**
   *
   */
  variant?: ITypographyVariant;
}
