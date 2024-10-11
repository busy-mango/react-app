import { IFlex, IOverflow } from '@/components';
import { ellipsis } from '@/utils/text';

const string = `各位同事领导好\r\n\r\n\r\n\r\n\r\n\r\nEAST本月报送即将开始，提醒您及时在PLMS系统中完成以下事项，谢谢!(PLMS系统地址：http://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)tp://ivs-plms.paic.com.cn)
EAST本月报送即将开始，提醒您及时在PLMS系统中完成以下事项，谢谢!(PLMS系统地址：http://ivs-plms.paic.com.cn)
`;

const App: React.FC = () => (
  <IFlex vertical gap={16}>
    <IOverflow
      maxRow={3}
      style={{
        backgroundColor: 'var(--bg-color-warp)',
        borderRadius: 'var(--border-radius-2)',
      }}
      tip={string}
    >
      {string}
    </IOverflow>
    <IOverflow
      maxRow={3}
      style={{
        backgroundColor: 'var(--bg-color-warp)',
        borderRadius: 'var(--border-radius-2)',
      }}
      tip={string}
    >
      {ellipsis(string)}
    </IOverflow>
  </IFlex>
);

export default App;
