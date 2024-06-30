import type { ReactSvgProps } from '@/models';

export type ISignType =
  | 'tick'
  | 'info'
  | 'plus'
  | 'minus'
  | 'clock'
  | 'cross'
  | 'helper'
  | 'magnifier'
  | 'arrow-top'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-bottom';

// arrow.double refresh

export interface ISignLineProps extends ReactSvgProps {
  type: ISignType;
  ring?: boolean;
}
