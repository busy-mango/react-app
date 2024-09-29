import type { SVGMotionProps } from 'framer-motion';

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

export interface ISignLineProps extends SVGMotionProps<SVGSVGElement> {
  type?: ISignType;
  ring?: boolean;
  rect?: boolean;
  trigon?: boolean;
}
