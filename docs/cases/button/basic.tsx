import {
  IButton,
  IFieldCell,
  IFieldGrid,
  IFlex,
  IFormWrap,
  ISwitch,
} from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [disabled, { iCheck }] = useToggle();

  return (
    <IFlex vertical gap={8}>
      <IFormWrap>
        <IFieldGrid responsive mode="horizontal">
          <IFieldCell title="disabled">
            <ISwitch checked={disabled} onChange={iCheck} />
          </IFieldCell>
        </IFieldGrid>
      </IFormWrap>
      <IFlex wrap gap={8}>
        <IButton disabled={disabled} variant="filled">
          主要按钮
        </IButton>
        <IButton disabled={disabled} variant="bordered">
          次要按钮
        </IButton>
        <IButton disabled={disabled} variant="text">
          文本按钮
        </IButton>
      </IFlex>
      <IFlex wrap gap={8}>
        <IButton danger disabled={disabled} variant="filled">
          主要按钮
        </IButton>
        <IButton danger disabled={disabled} variant="bordered">
          次要按钮
        </IButton>
        <IButton danger disabled={disabled} variant="text">
          文本按钮
        </IButton>
      </IFlex>
    </IFlex>
  );
};

export default App;
