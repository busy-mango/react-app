import type { ControlOption } from '@/components';
import {
  IFieldCell,
  IFieldGrid,
  IFlex,
  IFormWrap,
  IRadioGroup,
} from '@/components';

const options: ControlOption[] = [
  { value: 1, label: '选项1' },
  { value: 2, label: '选项2' },
  { value: 3, label: '选项3' },
  { value: 4, label: '选项4' },
  { value: 5, label: '选项5' },
  { value: 6, label: '选项6' },
  { value: 7, label: '一个超长超长超长的选项7' },
];

const App: React.FC = () => (
  <IFormWrap>
    <IFieldGrid mode="vertical">
      <IFieldCell title="RadioGroup">
        <IFlex wrap gap={8}>
          <IRadioGroup options={options} />
        </IFlex>
      </IFieldCell>
    </IFieldGrid>
  </IFormWrap>
);

export default App;
