import { Fragment } from 'react';

import { IOverlay } from '@/components';

const App: React.FC = () => (
  <Fragment>
    <IOverlay scroll={false} />
    <div>Floating element</div>
  </Fragment>
);

export default App;
