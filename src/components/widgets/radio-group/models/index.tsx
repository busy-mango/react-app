import type { PartialPick } from '@busymango/utils';

import type { ControlOption, ControlPattern } from '../../control';
import type { IRadioProps } from '../../radio/models';

export interface IRadioGroupProps
  extends PartialPick<
    IRadioProps,
    'direction' | 'render' | 'variant' | 'size' | 'name'
  > {
  pattern?: ControlPattern;
  options?: ControlOption[];
  value?: ControlOption['value'];
  defaultValue?: ControlOption['value'];
  onChange?: (
    value?: ControlOption['value'] | null,
    option?: ControlOption
  ) => void;
}
