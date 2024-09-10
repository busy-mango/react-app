import { useState } from 'react';

import type { ControlPattern } from '@/components';
import { ICheckbox, IFlex, IRadioGroup } from '@/components';

const App: React.FC = () => {
  const [pattern, setPattern] = useState<ControlPattern>();
  return (
    <IFlex vertical gap={16}>
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
          onChange={(value) => {
            setPattern(value as ControlPattern);
          }}
        />
      </IFlex>
      <IFlex gap={8}>
        <ICheckbox label="Checkbox" pattren={pattern} />
        <ICheckbox indeterminate label="Indeterminate" pattren={pattern} />
      </IFlex>
    </IFlex>
  );
};

export default App;
