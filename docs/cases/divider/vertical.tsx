import { IDivider, IFlex, ISignLine } from '@/components';
import { iThemeVariable } from '@/utils';

const App: React.FC = () => (
  <IFlex gap={iThemeVariable('--gap-01')}>
    <ISignLine type="arrowDoubleLeft" />
    <IDivider vertical />
    <ISignLine type="arrowDoubleRight" />
    <IDivider vertical />
    <ISignLine type="magnifier" />
  </IFlex>
);

export default App;
