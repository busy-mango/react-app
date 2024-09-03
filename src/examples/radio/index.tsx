import type { ControlOption } from '@/components';
import {
  IFieldCell,
  IFieldGrid,
  IFlex,
  IFormWrap,
  IRadioGroup,
  ISafeArea,
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

const NormalRadio: React.FC = () => {
  return (
    <ISafeArea>
      <IFormWrap>
        <IFieldGrid mode="horizontal">
          <IFieldCell title="RadioGroup">
            <IFlex wrap gap={8}>
              <IRadioGroup options={options} />
            </IFlex>
          </IFieldCell>
        </IFieldGrid>
      </IFormWrap>
    </ISafeArea>
  );
};

export default NormalRadio;
