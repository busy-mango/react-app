import { IButton, IFlex } from '@/components';

const App: React.FC = () => (
  <IFlex vertical gap={8}>
    <IFlex gap={8}>
      <IButton variant="filled">主要按钮</IButton>
      <IButton variant="bordered">次要按钮</IButton>
      <IButton variant="text">文本按钮</IButton>
    </IFlex>
    <IFlex gap={8}>
      <IButton disabled variant="filled">
        主要按钮
      </IButton>
      <IButton disabled variant="bordered">
        次要按钮
      </IButton>
      <IButton disabled variant="text">
        文本按钮
      </IButton>
    </IFlex>
    <IFlex gap={8}>
      <IButton danger variant="filled">
        主要按钮
      </IButton>
      <IButton danger variant="bordered">
        次要按钮
      </IButton>
      <IButton danger variant="text">
        文本按钮
      </IButton>
    </IFlex>
  </IFlex>
);

export default App;
