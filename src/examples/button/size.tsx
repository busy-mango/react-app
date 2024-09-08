import { IButton, IFlex, ISignLine } from '@/components';

const App: React.FC = () => (
  <IFlex vertical gap={8}>
    <IButton isFullWidth variant="filled">
      主要按钮
    </IButton>
    <IButton isFullWidth variant="bordered">
      次要按钮
    </IButton>
    <IButton isFullWidth variant="text">
      文本按钮
    </IButton>
    <IFlex gap={8}>
      <IButton size="huge" variant="filled">
        主要按钮
      </IButton>
      <IButton
        icon={<ISignLine ring type="helper" />}
        size="huge"
        variant="filled"
      >
        图标
      </IButton>
      <IButton size="huge" variant="bordered">
        次要按钮
      </IButton>
      <IButton size="huge" variant="text">
        文本按钮
      </IButton>
    </IFlex>
    <IFlex gap={8}>
      <span>
        这是一段
        <IButton size="mini" variant="text">
          按钮
        </IButton>
        文本
      </span>
    </IFlex>
  </IFlex>
);

export default App;
