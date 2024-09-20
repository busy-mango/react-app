import { useState } from 'react';

import type { ControlUISize } from '@/components';
import { IButton, IFlex, IRadioGroup, ISignLine, ISwitch } from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [checked, { iCheck }] = useToggle();

  const [size, setSize] = useState<ControlUISize>('medium');

  return (
    <IFlex vertical gap={8}>
      <IFlex>
        <ISwitch checked={checked} onChange={iCheck} />
      </IFlex>
      <IFlex gap={8}>
        <IRadioGroup
          options={(['huge', 'medium', 'mini'] satisfies ControlUISize[]).map(
            (value) => ({ value })
          )}
          value={size}
          onChange={(val) => {
            setSize(val as ControlUISize);
          }}
        />
      </IFlex>
      <IFlex wrap gap={8}>
        <IButton isFullWidth={checked} size={size} variant="filled">
          主要按钮
        </IButton>
        <IButton isFullWidth={checked} size={size} variant="bordered">
          次要按钮
        </IButton>
        <IButton isFullWidth={checked} size={size} variant="text">
          文本按钮
        </IButton>
      </IFlex>
      <IFlex gap={8}>
        <IButton
          icon={<ISignLine ring type="helper" />}
          size="mini"
          variant="filled"
        >
          图标
        </IButton>
        <span>
          这是一段
          <IButton size="mini" variant="text">
            按钮
          </IButton>
          文本
        </span>
      </IFlex>
    </IFlex>
  );
};

export default App;
