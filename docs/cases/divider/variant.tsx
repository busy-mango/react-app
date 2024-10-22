import { VariantControl } from '@cases/widgets';

import { IChip, IDivider, IFlex } from '@/components';

const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const App: React.FC = () => (
  <VariantControl alignable>
    {({ variant, align }) => (
      <IFlex vertical>
        <div>
          {content}
          <IDivider align={align} variant={variant}>
            {align?.toUpperCase()}
          </IDivider>
          {content}
          <IDivider align={align}>
            <IChip>{align?.toUpperCase()}</IChip>
          </IDivider>
          {content}
        </div>
      </IFlex>
    )}
  </VariantControl>
);

export default App;
