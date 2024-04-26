import type { WrapperProps } from '@/models';

export interface IFlexProps extends WrapperProps<HTMLElement> {
  children: React.ReactNode;
  vertical?: boolean;
  reverse?: boolean;
  gap?: React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  wrap?: React.CSSProperties['flexWrap'];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
}
