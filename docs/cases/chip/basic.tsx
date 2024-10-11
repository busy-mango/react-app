import { VariantControl } from '@cases/widgets';

import { IChip, IFlex } from '@/components';
import type { IChipProps } from '@/components/widgets/chip/models';

const App: React.FC = () => (
  <VariantControl
    variants={['filled', 'bordered'] satisfies IChipProps['variant'][]}
  >
    {({ size, variant }) => (
      <IFlex gap={8}>
        <IChip size={size} variant={variant}>
          Chip
        </IChip>
      </IFlex>
    )}
  </VariantControl>
);

export default App;
