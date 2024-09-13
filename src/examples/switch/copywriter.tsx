import { Fragment } from 'react';

import { ISwitch } from '@/components';

const App: React.FC = () => (
  <Fragment>
    <ISwitch
      render={{
        label: (_, { checked }) => (checked ? '开' : '关'),
      }}
    />
  </Fragment>
);

export default App;
