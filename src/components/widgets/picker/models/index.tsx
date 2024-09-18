import type { HTMLMotionProps } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

import type { ControlOption } from '../../control';

export interface IWheelOptionProps {
  isFocus?: boolean;
  container: React.RefObject<HTMLDivElement>;
}

export interface IWheelProps {
  options?: ControlOption[];
  value?: ControlOption['value'];
  onChange?: (value?: ControlOption['value']) => void;
}

export interface IPickerProps
  extends OmitOf<
    HTMLMotionProps<'div'>,
    'title' | 'onChange' | 'defaultValue'
  > {
  open?: boolean;
  initialOpen?: boolean;
  defaultValue?: ControlOption['value'][];
  value?: ControlOption['value'][];
  columns?: ControlOption[][];
  onChange?: (value?: ControlOption['value'][]) => void;
  onOpenChange?: (open?: boolean) => void;
}
