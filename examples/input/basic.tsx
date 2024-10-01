import { produce } from 'immer';
import { create } from 'zustand';

import { isEmpty, isString } from '@busymango/is-esm';
import { VariantControl } from '@examples/widgets';

import type { IControlWrapProps } from '@/components';
import { IControlWrap, IFlex, IInput, ISignLine } from '@/components';

import AccountSVG from '@/icons/account.svg?react';

type InputStore = {
  text?: string | null;
  clear?: () => void;
  change?: (text?: string | React.ChangeEvent<HTMLInputElement>) => void;
};

const useInputStore = create<InputStore>((set) => ({
  clear: () => {
    set(
      produce((state: InputStore) => {
        state.text = null;
      })
    );
  },
  change: (event) => {
    set(
      produce((state: InputStore) => {
        if (isString(event)) {
          state.text = event;
        }
        if (!isString(event)) {
          state.text = event?.target.value;
        }
      })
    );
  },
}));

const App: React.FC = () => {
  const { text, clear, change } = useInputStore();

  const closeable = !isEmpty(text);

  return (
    <VariantControl
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
      {({ size, status, variant }) => (
        <IFlex>
          <IControlWrap
            isSuffixClickable={closeable}
            prefix={<AccountSVG />}
            size={size}
            status={status}
            suffix={
              <ISignLine
                animate={{ opacity: closeable ? 1 : 0 }}
                type="cross"
              />
            }
            variant={variant}
            onSuffixClick={clear}
          >
            <IInput
              placeholder="占位文本"
              value={text}
              width="100%"
              onChange={change}
            />
          </IControlWrap>
        </IFlex>
      )}
    </VariantControl>
  );
};

export default App;
