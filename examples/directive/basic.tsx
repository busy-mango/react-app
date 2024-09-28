import { Fragment } from 'react/jsx-runtime';

import { ISignLine } from '@/components';
import { IDirective } from '@/components/widgets/directive';

const App: React.FC = () => (
  <Fragment>
    <IDirective
      icon={<ISignLine ring type="informer" />}
      title="通用"
    ></IDirective>
    <IDirective icon={<ISignLine ring type="tick" />} title="成功"></IDirective>
    <IDirective title="失败"></IDirective>
    <IDirective title="警告"></IDirective>
  </Fragment>
);

export default App;
