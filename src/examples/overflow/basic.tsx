import { IFlex, IOverflow } from '@/components';
import { ellipsis } from '@/utils/text';

const string = `我是一段\n我是一段\n我是一段\n${'23213'.repeat(40)}的文本`;

const App: React.FC = () => (
  <IFlex vertical gap={16}>
    <IOverflow>我是一段{`超长`.repeat(40)}文本</IOverflow>
    <IOverflow maxRow={3} tip={string}>
      {ellipsis(string)}
    </IOverflow>
  </IFlex>
);

export default App;
