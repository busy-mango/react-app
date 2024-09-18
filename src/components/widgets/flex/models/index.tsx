import type { ReactWrapProps } from '@/models';

export interface IFlexProps extends ReactWrapProps {
  children: React.ReactNode;
  vertical?: boolean;
  reverse?: boolean;
  centered?: boolean;
  inline?: boolean;
  gap?: React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  wrap?: React.CSSProperties['flexWrap'] | true;
  align?: React.CSSProperties['alignItems'];
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
}
