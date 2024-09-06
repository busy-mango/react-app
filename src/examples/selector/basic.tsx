import { ISelector } from '@/components';

const App: React.FC = () => (
  <ISelector
    options={[
      { value: 10, label: 'Ten' },
      { value: 20, label: 'Twenty' },
      { value: 30, label: 'Thirty' },
    ]}
    placeholder="placeholder"
  />
);

export default App;
