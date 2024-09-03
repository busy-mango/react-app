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
    variant,
    direction,
    defaultValue,
    pattern = 'editable',
    onChange,
  } = props;

  const [current, iChange] = useControlState({
    value,
    defaultValue,
    onChange,
  });

  const assert = usePatternAssert(pattern);

  if (assert.isReadPretty) {
    const option = options?.find(({ value }) => value === current);
    return option?.label ?? option?.title ?? option?.value?.toString();
  }

  return options?.map((option) => (
    <IRadio
      key={option.value}
      checked={current === option.value}
      defaultChecked={defaultValue === option.value}
      direction={direction}
      name={name}
      readOnly={assert.isReadOnly}
      render={render}
      size={size}
      variant={variant}
      onChange={() => {
        iChange?.(option.value, option);
      }}
      {...option}
      disabled={option.disabled ?? assert.isDisabled}
    />
  ));
};
