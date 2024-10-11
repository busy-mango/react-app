import type { ControlOption } from '@/components';
import {
  IFlex,
  IRadioGroup,
  ISafeArea,
  ISegment,
  ISelector,
  ISVGWrap,
} from '@/components';
import { iThemeVariable } from '@/utils';

import CloudSVG from '../icons/cloud.svg?react';
import GmailSVG from '../icons/gmail.svg?react';

import * as styles from './email.scss';

const options: ControlOption[] = [
  {
    value: 'mango@gmail.com',
    label: (
      <IFlex centered gap={iThemeVariable('--gap-02')}>
        <ISVGWrap>
          <GmailSVG />
        </ISVGWrap>
        mango@gmail.com
      </IFlex>
    ),
  },
  {
    value: 'mango@cloud.com',
    label: (
      <IFlex centered gap={iThemeVariable('--gap-02')}>
        <ISVGWrap>
          <CloudSVG />
        </ISVGWrap>
        mango@cloud.com
      </IFlex>
    ),
  },
];

const App: React.FC = () => {
  return (
    <ISafeArea className={styles.area}>
      <div>
        <ISelector
          defaultValue={'mango@gmail.com'}
          options={options}
          style={{
            width: 196,
          }}
        />
      </div>
      <IFlex align="center" justify="space-between" style={{ width: 256 }}>
        <span>收件箱</span>
        <div>
          <ISegment
            options={[
              { value: 'all', label: '所有邮件' },
              { value: 'unread', label: '未读邮件' },
            ]}
          />
        </div>
      </IFlex>
      <div style={{ width: '100%' }}>
        <IRadioGroup />
      </div>
      <p>4</p>
      <p>5</p>
      <p>6</p>
    </ISafeArea>
  );
};

export default App;

export const frontmatter = {
  // 声明布局类型
  outline: false,
};
