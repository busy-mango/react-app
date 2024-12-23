import { ICard, IHighLighter, ITypography } from '@/components';

const App: React.FC = () => (
  <ICard>
    <ITypography>
      <IHighLighter content="我是一段文本" keyword="文本" />
    </ITypography>
  </ICard>
);

export default App;
