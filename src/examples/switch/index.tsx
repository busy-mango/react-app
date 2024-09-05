import { Fragment } from 'react/jsx-runtime';

import { ISwitch } from '@/components';

const App: React.FC = () => (
  <Fragment>
    <ISwitch />
    <ISwitch size="mini" />
  </Fragment>
);

export default App;
