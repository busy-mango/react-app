import { IFlex, IOverflow } from '@/components';
import { ellipsis } from '@/utils/text';

const string = `各位同事领导好



EAST本月报送即将开始，提醒您及时在PLMS系统中完成以下事项，谢谢!(PLMS系统地址：http://ivs-plms.paic.com.cn)
EAST本月报送即将开始，提醒您及时在PLMS系统中完成以下事项，谢谢!(PLMS系统地址：http://ivs-plms.paic.com.cn)
`;

const App: React.FC = () => (
  <IFlex vertical gap={16}>
    {/* <IOverflow>我是一段{`超长`.repeat(40)}文本</IOverflow> */}
    <IOverflow maxRow={3} style={{ backgroundColor: 'black' }} tip={string}>
      {string}
    </IOverflow>
    <IOverflow maxRow={3} style={{ backgroundColor: 'black' }} tip={string}>
      {ellipsis(string)}
    </IOverflow>
  </IFlex>
);

export default App;
