import type { IControlVariant } from '@/components';
import { ISelector } from '@/components';

import { VariantControl } from '../widgets';

const App: React.FC = () => (
  <VariantControl
    patternable
    sizeable
    statusable
    variants={['bordered', 'filled', 'standard'] satisfies IControlVariant[]}
  >
    {({ size, pattern, variant, status }) => (
      <ISelector
        options={[
          { value: 10, label: 'Ten' },
          { value: 20, label: 'Twenty' },
          { value: 30, label: 'Thirty' },
        ]}
        pattern={pattern}
        placeholder="placeholder"
        size={size}
        status={status}
        variant={variant}
      />
    )}
  </VariantControl>
);

export default App;
