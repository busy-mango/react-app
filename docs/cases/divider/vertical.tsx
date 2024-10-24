import { IButton, IDivider, IFlex, ISignLine } from '@/components';
import { iThemeVariable } from '@/utils';

const App: React.FC = () => (
  <IFlex gap={iThemeVariable('--gap-01')}>
    <IButton icon={<ISignLine type="arrowDoubleLeft" />} variant="text" />
    <IDivider vertical />
    <IButton icon={<ISignLine type="arrowDoubleRight" />} variant="text" />
    <IDivider vertical />
    <IButton icon={<ISignLine type="magnifier" />} variant="text" />
  </IFlex>
);

export default App;
