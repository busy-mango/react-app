import { useRef } from 'react';
import { Variants } from 'docs/widgets';

import { isEmpty } from '@busymango/is-esm';

import type { IControlWrapProps, IInputProps } from '@/components';
import {
  IControlWrap,
  IInput,
  ISignLine,
  onInputCatch,
  useControlState,
} from '@/components';
import { isInputElement } from '@/utils';

import AccountSVG from '@/icons/account.svg?react';

const Input: React.FC<
  IInputProps & Pick<IControlWrapProps, 'size' | 'variant' | 'status'>
> = (props) => {
  const { size, variant, status, value, pattern, onChange, ...others } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [text, iChange] = useControlState({
    value,
    onChange,
    onCatch: onInputCatch,
  });

  const closeable = !isEmpty(text);

  const clear = () => {
    const { current } = ref;
    if (isInputElement(current)) {
      current.value = '';
      current.dispatchEvent(new Event('change'));
    }
  };

  return (
    <IControlWrap
      isSuffixClickable={closeable}
      pattern={pattern}
      prefix={<AccountSVG />}
      size={size}
      status={status}
      suffix={closeable && <ISignLine type="cross" />}
      variant={variant}
      onSuffixClick={clear}
    >
      <IInput
        ref={ref}
        pattern={pattern}
        placeholder="占位文本"
        value={text}
        width="100%"
        onChange={iChange}
        {...others}
      />
    </IControlWrap>
  );
};

const App: React.FC = () => (
  <Variants
    patternable
    sizeable
    statusable
    variants={
      [
        'bordered',
        'filled',
        'standard',
      ] satisfies IControlWrapProps['variant'][]
    }
  >
    {({ size, status, variant, pattern }) => (
      <Input pattern={pattern} size={size} status={status} variant={variant} />
    )}
  </Variants>
);

export default App;
