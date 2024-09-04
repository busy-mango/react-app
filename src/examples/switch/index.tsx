import { Fragment } from 'react/jsx-runtime';

import { ISwitch } from '@/components/widgets/switch';

const App: React.FC = () => {
  return (
    <Fragment>
      <ISwitch />
      <ISwitch size="mini" />
    </Fragment>
  );
};

export default App;
