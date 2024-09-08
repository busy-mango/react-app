import { IButton, IFlex, ISignLine } from '@/components';

const App: React.FC = () => (
  <IFlex vertical gap={8}>
    <IFlex gap={8}>
      <IButton icon={<ISignLine type="magnifier" />} variant="filled">
        搜索
      </IButton>
      <IButton icon={<ISignLine type="magnifier" />} variant="bordered">
        搜索
      </IButton>
      <IButton icon={<ISignLine type="magnifier" />} variant="text">
        搜索
      </IButton>
      <IButton icon={<ISignLine type="magnifier" />} variant="filled" />
    </IFlex>
    <IFlex gap={8}>
      <IButton capsule icon={<ISignLine type="magnifier" />} variant="filled" />
      <IButton capsule icon={<ISignLine type="magnifier" />} variant="bordered">
        搜索
      </IButton>
      <IButton capsule icon={<ISignLine type="magnifier" />} variant="text">
        搜索
      </IButton>
    </IFlex>
  </IFlex>
);

export default App;
