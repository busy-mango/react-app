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

import AccountSVG from '@/icons/account.svg?react';

const Input: React.FC<
  IInputProps &
    Pick<IControlWrapProps, 'size' | 'variant' | 'status'> & {
      onClear?: () => void;
    }
> = (props) => {
  const {
    size,
    variant,
    status,
    value,
    pattern,
    onClear,
    onChange,
    ...others
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [text, handler] = useControlState({
    value,
    onChange,
    onCatch: onInputCatch,
  });

  const isSuffixClickable = !isEmpty(text);

  return (
    <IControlWrap
      isSuffixClickable={isSuffixClickable}
      pattern={pattern}
      prefix={<AccountSVG />}
      size={size}
      status={status}
      suffix={isSuffixClickable && <ISignLine type="cross" />}
      variant={variant}
      onSuffixClick={onClear}
    >
      <IInput
        ref={ref}
        pattern={pattern}
        placeholder="占位文本"
        value={text}
        width="100%"
        onChange={handler}
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
