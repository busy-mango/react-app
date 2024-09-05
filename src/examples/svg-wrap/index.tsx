import { IFlex, ISignLine, ISVGWrap } from '@/components';

import { BaseLineWrap } from '../widgets';

const App: React.FC = () => (
  <IFlex vertical gap={16}>
    <BaseLineWrap>
      <ISignLine ring type="helper" />
      帮助
      <ISignLine type="helper" />
      <ISVGWrap>
        <ISignLine ring type="helper" />
      </ISVGWrap>
      帮助
      <ISVGWrap>
        <ISignLine type="helper" />
      </ISVGWrap>
    </BaseLineWrap>
    <BaseLineWrap>
      Tick Style <ISignLine type="tick" />
      Tick Style
      <ISVGWrap>
        <ISignLine type="tick" />
      </ISVGWrap>
    </BaseLineWrap>
    <BaseLineWrap>
      100
      <ISignLine type="dollar" />
      100
      <ISVGWrap>
        <ISignLine type="dollar" />
      </ISVGWrap>
    </BaseLineWrap>
  </IFlex>
);

export default App;
