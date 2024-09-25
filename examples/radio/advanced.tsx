import { useState } from 'react';
import { nanoid } from 'nanoid';

import type {
  ControlOption,
  ControlPattern,
  ControlUISize,
} from '@/components';
import {
  IFieldCell,
  IFieldGrid,
  IFlex,
  IFormWrap,
  IRadioGroup,
} from '@/components';

const name = nanoid();

const options: ControlOption[] = [
  { value: 1, label: '选项1' },
  { value: 2, label: '选项2', disabled: true },
  { value: 3, label: '选项3' },
  { value: 4, label: '选项4' },
  { value: 5, label: '选项5' },
  { value: 6, label: '选项6' },
];

const App: React.FC = () => {
  const [size, setSize] = useState<ControlUISize>('medium');

  const [pattern, setPattern] = useState<ControlPattern>('editable');

  return (
    <IFormWrap>
      <IFieldGrid mode="vertical">
        <IFieldCell title="Size">
          <IFlex wrap gap={8}>
            <IRadioGroup
              name="size"
              options={(
                ['mini', 'medium', 'huge'] satisfies ControlUISize[]
              ).map((value) => ({ value }))}
              value={size}
              onChange={(val) => {
                setSize(val as ControlUISize);
              }}
            />
          </IFlex>
        </IFieldCell>
      </IFieldGrid>
      <IFieldGrid mode="vertical">
        <IFieldCell title="Size">
          <IFlex wrap gap={8}>
            <IRadioGroup
              name="pattern"
              options={(
                [
                  'editable',
                  'disabled',
                  'readOnly',
                  'readPretty',
                ] satisfies ControlPattern[]
              ).map((value) => ({ value }))}
              value={pattern}
              onChange={(val) => {
                setPattern(val as ControlPattern);
              }}
            />
          </IFlex>
        </IFieldCell>
      </IFieldGrid>
      <IFieldGrid mode="vertical">
        <IFieldCell title="RadioGroup">
          <IFlex wrap gap={8}>
            <IRadioGroup
              name={name}
              options={options}
              pattern={pattern}
              size={size}
            />
          </IFlex>
        </IFieldCell>
      </IFieldGrid>
    </IFormWrap>
  );
};

export default App;
