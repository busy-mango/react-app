import type { ReactSvgProps } from '@/models';

export type ISignType =
  | 'tick'
  | 'cross'
  | 'info'
  | 'arrow-top'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-bottom';

// arrow.double clock helper magnifier minus plus refresh

export interface ISignLineProps extends ReactSvgProps {
  type: ISignType;
  ring?: boolean;
}
