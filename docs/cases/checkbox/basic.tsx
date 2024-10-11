import { useState } from 'react';

import type { ControlPattern, ControlUISize } from '@/components';
import { ICheckbox, IFlex, IRadioGroup } from '@/components';

const App: React.FC = () => {
  const [size, setSize] = useState<ControlUISize>('medium');

  const [pattern, setPattern] = useState<ControlPattern>('editable');

  return (
    <IFlex vertical gap={16}>
      <IFlex gap={8}>
        <IRadioGroup
          options={(['mini', 'medium', 'huge'] satisfies ControlUISize[]).map(
            (value) => ({
              value,
            })
          )}
          value={size}
          onChange={(value) => {
            setSize(value as ControlUISize);
          }}
        />
      </IFlex>
      <IFlex gap={8}>
        <IRadioGroup
          options={(
            [
              'editable',
              'disabled',
              'readOnly',
              'readPretty',
            ] satisfies ControlPattern[]
          ).map((value) => ({
            value,
            label: value,
          }))}
          value={pattern}
          onChange={(value) => {
            setPattern(value as ControlPattern);
          }}
        />
      </IFlex>
      <IFlex gap={8}>
        <ICheckbox label="Checkbox" pattren={pattern} size={size} />
      </IFlex>
    </IFlex>
  );
};

export default App;
