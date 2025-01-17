import { useState } from 'react';

import type { IFlexProps } from '@/components';
import { IChip, IFlex, IInput, IRadioGroup } from '@/components';

const App: React.FC = () => {
  const [gap, setGap] = useState<number>(8);
  const [align, setAlign] = useState<IFlexProps['align']>();
  const [justify, setJustify] = useState<IFlexProps['justify']>();

  return (
    <IFlex vertical gap={16}>
      <IInput
        suffix="px"
        value={gap}
        variant="bordered"
        onChange={({ target }) => {
          const num = Number(target.value);
          setGap(isFinite(num) ? num : 0);
        }}
      />
      <IFlex gap={8}>
        <IRadioGroup
          options={[
            'flex-start',
            'center',
            'flex-end',
            'space-between',
            'space-around',
            'space-evenly',
          ].map((value) => ({
            value,
            label: value,
          }))}
          value={justify}
          onChange={(value) => setJustify(value?.toString())}
        />
      </IFlex>
      <IFlex gap={8}>
        <IRadioGroup
          options={['flex-start', 'center', 'flex-end'].map((value) => ({
            value,
            label: value,
          }))}
          value={align}
          onChange={(value) => setAlign(value?.toString())}
        />
      </IFlex>
      <IFlex
        align={align}
        gap={gap}
        justify={justify}
        style={{
          height: 64,
          padding: 'var(--gap-03)',
          border: '1px solid var(--border-color-2)',
          borderRadius: 'var(--border-radius-3)',
        }}
      >
        <IChip layout>1</IChip>
        <IChip layout>2</IChip>
        <IChip layout>3</IChip>
        <IChip layout>4</IChip>
      </IFlex>
    </IFlex>
  );
};

export default App;
