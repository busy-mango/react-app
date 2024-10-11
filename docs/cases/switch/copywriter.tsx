import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import type { ControlPattern } from '@/components';
import { IFlex, IRadioGroup, ISignLine, ISVGWrap, ISwitch } from '@/components';
import type { ISwitchLabelRender } from '@/components/widgets/switch/models';

const render: ISwitchLabelRender = (_, { checked, pattren }) => (
  <IFlex direction={checked ? 'row' : 'row-reverse'}>
    <AnimatePresence>
      {pattren !== 'readPretty' && (
        <ISVGWrap>
          <ISignLine type={checked ? 'tick' : 'cross'} />
        </ISVGWrap>
      )}
    </AnimatePresence>
    <span>{checked ? '已开启' : '已关闭'}</span>
  </IFlex>
);

const App: React.FC = () => {
  const [pattren, setPattren] = useState<ControlPattern>('editable');

  return (
    <IFlex vertical gap={8}>
      <IFlex wrap gap={8}>
        <IRadioGroup
          options={(
            [
              'disabled',
              'editable',
              'readOnly',
              'readPretty',
            ] satisfies ControlPattern[]
          ).map((value) => ({
            value,
          }))}
          value={pattren}
          onChange={(value) => {
            setPattren(value as ControlPattern);
          }}
        />
      </IFlex>
      <IFlex>
        <ISwitch pattren={pattren} render={{ label: render }} />
      </IFlex>
    </IFlex>
  );
};

export default App;
