import { useRef, useState } from 'react';

import type { Placement } from '@floating-ui/react';

import { IButton, IFlex, IPopover, IRadioGroup } from '@/components';
import { iThemeVariable } from '@/utils';

const App: React.FC = () => {
  const ref = useRef(null);

  const [placement, setPlacement] = useState<Placement>('top');

  return (
    <IFlex vertical gap={8} style={{ width: '100%' }}>
      <IFlex wrap gap={6}>
        <IRadioGroup
          options={(
            [
              'top',
              'top-end',
              'top-start',
              'bottom',
              'bottom-end',
              'bottom-start',
              'left',
              'left-end',
              'left-start',
              'right',
              'right-end',
              'right-start',
            ] satisfies Placement[]
          ).map((value) => ({
            value,
          }))}
          value={placement}
          onChange={(v) => setPlacement(v as Placement)}
        />
      </IFlex>
      <IFlex ref={ref} centered style={{ padding: iThemeVariable('--gap-10') }}>
        <IPopover
          open
          content={placement}
          mode="tip"
          placement={placement}
          root={ref}
          trigger={'click'}
        >
          {(props) => (
            <IButton size="huge" tabIndex={0} {...props}>
              {placement}
            </IButton>
          )}
        </IPopover>
      </IFlex>
    </IFlex>
  );
};

export default App;
