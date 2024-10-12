import type { SVGMotionProps, Target } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

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

export interface ISignLineProps
  extends OmitOf<SVGMotionProps<SVGSVGElement>, 'animate'> {
  type?: ISignType;
  ring?: boolean;
  rect?: boolean;
  trigon?: boolean;
  animate?: Target;
}
