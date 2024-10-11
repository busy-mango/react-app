import { useState } from 'react';

import type { ControlUISize } from '@/components';
import { IFlex, IRadioGroup, ISwitch } from '@/components';

const App: React.FC = () => {
  const [size, setSize] = useState<ControlUISize>('medium');

  return (
    <IFlex vertical gap={8}>
      <IFlex wrap gap={8}>
        <IRadioGroup
          options={(['huge', 'medium', 'mini'] satisfies ControlUISize[]).map(
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
      <IFlex>
        <ISwitch size={size} />
      </IFlex>
    </IFlex>
  );
};

export default App;
