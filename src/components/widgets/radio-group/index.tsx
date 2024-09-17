import { useControlState, usePatternAssert } from '../control';
import { IRadio } from '../radio';
import type { IRadioGroupProps } from './models';

export const IRadioGroup: React.FC<IRadioGroupProps> = (props) => {
  const {
    name,
    size,
    value,
    render,
    options,
    defaultValue,
    pattern = 'editable',
    onChange,
  } = props;

  const assert = usePatternAssert(pattern);

  const [current, iChange] = useControlState({
    value,
    defaultValue,
    onChange,
  });

  if (assert.isReadPretty) {
    const option = options?.find(({ value }) => value === current);
    return option?.label ?? option?.title ?? option?.value?.toString();
  }

  return options?.map((option) => (
    <IRadio
      key={option.value}
      checked={current === option.value}
      defaultChecked={defaultValue === option.value}
      label={option.value?.toLocaleString()}
      name={name}
      readOnly={assert.isReadOnly}
      render={render}
      size={size}
      onChange={() => {
        iChange?.(option.value, option);
      }}
      {...option}
      disabled={option.disabled ?? assert.isDisabled}
    />
  ));
};
