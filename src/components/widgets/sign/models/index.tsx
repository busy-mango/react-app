import type { SVGMotionProps, Target } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

export type ISignType =
  | 'ban'
  | 'tick'
  | 'plus'
  | 'minus'
  | 'clock'
  | 'cross'
  | 'dollar'
  | 'helper'
  // | 'refresh'
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
  ring?: boolean;
  type?: ISignType;
  inline?: boolean;
  trigon?: boolean;
  animate?: Target;
}
