import { Variants } from 'docs/widgets';

import { ICheckbox, IFlex } from '@/components';

const App: React.FC = () => (
  <Variants patternable sizeable>
    {({ pattern, size }) => (
      <IFlex gap={8}>
        <ICheckbox label="Checkbox" pattren={pattern} size={size} />
      </IFlex>
    )}
  </Variants>
);

export default App;
