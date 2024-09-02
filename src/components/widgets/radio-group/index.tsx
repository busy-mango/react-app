import { type ControlOption, useControlState } from '../control';
import { IRadio } from '../radio';

export const IRadioGroup: React.FC<{
  options?: ControlOption[];
  value?: ControlOption['value'] | null;
  defaultValue?: ControlOption['value'];
  onChange?: (
    value?: ControlOption['value'] | null,
    option?: ControlOption
  ) => void;
}> = (props) => {
  const { value, options, defaultValue, onChange } = props;

  const [current, iChange] = useControlState({
    value,
    defaultValue,
    onChange,
  });

  return options?.map((option) => (
    <IRadio
      key={option.value}
      checked={current === option.value}
      defaultChecked={defaultValue === option.value}
      onChange={() => {
        iChange?.(option.value, option);
      }}
      {...option}
    />
  ));
};
