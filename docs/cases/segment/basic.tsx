import { VariantControl } from '@cases/widgets';

import type { ControlOption } from '@/components';
import { IFlex, ISegment, ISwitch } from '@/components';
import { useToggle } from '@/hooks';
import { iThemeVariable } from '@/utils';

import GmailSVG from '../../icons/gmail.svg?react';

const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']
  .map<ControlOption>((value) => ({ value, label: value }))
  .concat([
    {
      value: 'Gmail',
      label: 'Gmail',
      icon: <GmailSVG />,
      disabled: true,
    },
  ]);

const App: React.FC = () => {
  const [vertical, { toggle: toggle1 }] = useToggle();
  const [isFullWidth, { toggle: toggle2 }] = useToggle();
  return (
    <VariantControl sizeable>
      {({ size }) => (
        <IFlex vertical gap={iThemeVariable('--gap-06')}>
          <ISwitch
            checked={vertical}
            render={{
              label: (_, { checked }) => (checked ? 'vertical' : 'horizontal'),
            }}
            onChange={toggle1}
          />
          <ISwitch
            checked={isFullWidth}
            render={{
              label: (_, { checked }) => (checked ? 'isFullWidth' : 'autoSize'),
            }}
            onChange={toggle2}
          />
          <ISegment
            isFullWidth={isFullWidth}
            options={options}
            size={size}
            vertical={vertical}
          />
        </IFlex>
      )}
    </VariantControl>
  );
};

export default App;
