import { useState } from 'react';

import type { ControlPattern, ControlUISize } from '@/components';
import { IFlex, IRadioGroup, ISwitch } from '@/components';

const App: React.FC = () => {
  const [size, setSize] = useState<ControlUISize>('medium');

  const [pattren, setPattren] = useState<ControlPattern>('editable');

  return (
    <IFlex vertical gap={8}>
      <IFlex wrap gap={8}>
        <IRadioGroup
          options={(['huge', 'medium', 'mini'] satisfies ControlUISize[]).map(
            (value) => ({
              value,
            })
          )}
          onChange={(value) => {
            setSize(value as ControlUISize);
          }}
        />
      </IFlex>
      <IFlex wrap gap={8}>
        <IRadioGroup
          options={(
            [
              'disabled',
              'editable',
              'readOnly',
              'readPretty',
            ] satisfies ControlPattern[]
          ).map((value) => ({
            value,
          }))}
          onChange={(value) => {
            setPattren(value as ControlPattern);
          }}
        />
      </IFlex>
      <IFlex>
        <ISwitch pattren={pattren} size={size} />
      </IFlex>
    </IFlex>
  );
};

export default App;
