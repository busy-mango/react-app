import { Variants } from 'docs/widgets';

import type { ControlOption, IControlVariant } from '@/components';
import { ISelector } from '@/components';

const options: ControlOption[] = [
  { value: 10, label: 'Ten' },
  { value: 20, label: 'Twenty' },
  { value: 30, label: 'Thirty' },
];

const App: React.FC = () => (
  <Variants
    patternable
    sizeable
    statusable
    variants={['bordered', 'filled', 'standard'] satisfies IControlVariant[]}
  >
    {({ size, pattern, variant, status }) => (
      <ISelector
        options={options}
        pattern={pattern}
        placeholder="placeholder"
        size={size}
        status={status}
        variant={variant}
      />
    )}
  </Variants>
);

export default App;
