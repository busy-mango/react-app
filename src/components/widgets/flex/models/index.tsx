import type { WrapperProps } from '@/models';

export interface IFlexProps extends WrapperProps<HTMLElement> {
  children: React.ReactNode;
  vertical?: boolean;
  reverse?: boolean;
  centered?: boolean;
  inline?: boolean;
  gap?: React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  wrap?: React.CSSProperties['flexWrap'] | true;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
}
