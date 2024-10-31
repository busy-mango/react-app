import GmailSVG from 'docs/icons/gmail.svg?react';
import { Variants } from 'docs/widgets';

import type { ControlOption } from '@/components';
import { ISegment } from '@/components';

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

const App: React.FC = () => (
  <Variants directionable sizeable widthable>
    {({ size, width, direction }) => (
      <ISegment
        isFullWidth={width === 'full-width'}
        options={options}
        size={size}
        vertical={direction === 'vertical'}
      />
    )}
  </Variants>
);

export default App;
