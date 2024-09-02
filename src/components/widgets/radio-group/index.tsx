import type { ControlOption } from '../control';
import { IRadio } from '../radio';

export const IRadioGroup: React.FC<{
  options?: ControlOption[];
  value?: ControlOption['value'];
  defaultValue?: ControlOption['value'];
}> = ({ value, options, defaultValue }) =>
  options?.map((option) => (
    <IRadio
      key={option.value}
      checked={value === option.value}
      defaultChecked={defaultValue === option.value}
      {...option}
    />
  ));
