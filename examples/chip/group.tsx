import { IChipGroup, IFlex } from '@/components';

const App: React.FC = () => (
  <IFlex gap={8}>
    <IChipGroup
      chips={[
        { value: 'Angular' },
        { value: 'jQuery' },
        { value: 'Polymer' },
        { value: 'React' },
        { value: 'Vue.js' },
      ]}
    />
  </IFlex>
);

export default App;
