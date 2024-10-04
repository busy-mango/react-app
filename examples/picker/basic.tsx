import { useRef } from 'react';

import { IControlWrap, IFlex, IPicker, ISignLine } from '@/components';
import { iThemeVariable } from '@/utils';

const columns = [
  [
    { label: '周一', value: '周一' },
    { label: '周二', value: '周二' },
    { label: '周三', value: '周三' },
    { label: '周四', value: '周四' },
    { label: '周五', value: '周五' },
  ],
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
];

const App: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  return (
    <IFlex centered>
      <article
        ref={ref}
        style={{
          width: 375,
          height: 667,
          position: 'relative',
          margin: iThemeVariable('--gap-02'),
          padding: iThemeVariable('--gap-04'),
          boxShadow: iThemeVariable('--shadow-06'),
          borderRadius: iThemeVariable('--border-radius-03'),
          backgroundColor: iThemeVariable('--bg-color-normal'),
        }}
      >
        <IControlWrap
          suffix={<ISignLine type="arrowRight" />}
          variant="bordered"
        >
          <IPicker columns={columns} root={ref} />
        </IControlWrap>
      </article>
    </IFlex>
  );
};

export default App;
