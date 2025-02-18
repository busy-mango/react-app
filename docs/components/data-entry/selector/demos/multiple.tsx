import { ISelector } from '@/components';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const options = names.map((value) => ({ value, label: value }));

const App = () => <ISelector multiple options={options} />;

export default App;
