import type { OmitOf } from '@busymango/utils';

import type { ControlOptionModel } from '@/components/models';
import type { ReactMotionDomProps, WrapperProps } from '@/models';

export interface IWheelOptionProps {
  isFocus?: boolean;
  container: React.RefObject<HTMLDivElement>;
}

export interface IWheelProps {
  options?: ControlOptionModel[];
  value?: ControlOptionModel['value'];
  onChange?: (value?: ControlOptionModel['value']) => void;
}

export interface IPickerProps
  extends OmitOf<
    ReactMotionDomProps<WrapperProps>,
    'title' | 'onChange' | 'defaultValue'
  > {
  open?: boolean;
  initialOpen?: boolean;
  defaultValue?: ControlOptionModel['value'][];
  value?: ControlOptionModel['value'][];
  columns?: ControlOptionModel[][];
  onChange?: (value?: ControlOptionModel['value'][]) => void;
  onOpenChange?: (open?: boolean) => void;
}
