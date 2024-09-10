import type { ReactSvgProps } from '@/models';

/**
 * TODO: refresh
 */
export type ISignType =
  | 'tick'
  | 'plus'
  | 'minus'
  | 'clock'
  | 'cross'
  | 'dollar'
  | 'helper'
  | 'informer'
  | 'magnifier'
  | 'arrowTop'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowBottom'
  | 'arrowDoubleTop'
  | 'arrowDoubleLeft'
  | 'arrowDoubleRight'
  | 'arrowDoubleBottom';

export interface ISignLineProps extends ReactSvgProps {
  type?: ISignType;
  ring?: boolean;
  rect?: boolean;
}
