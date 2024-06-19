/**
 * @description 首页
 */

import type { ControlOptionModel } from '@/components';
import {
  IButton,
  IMobilePage,
  IOverflow,
  ISelector,
  NoData,
  snackbar,
} from '@/components';
import { AppEnv, env } from '@/init';

const isDev = env.name === AppEnv.Dev;

const text = `${'很长'.repeat(20)}的文字`;

const children = (
  <span>
    <strong>Notice:</strong> You are currently running React in development
    mode. Rendering performance will be slightly degraded until this application
    is build for production.
  </span>
);

const options = Array.from<unknown, ControlOptionModel>(
  { length: 10000 },
  (_, i) => ({
    value: i,
    label: `item ${i + 1}`,
    title: `item ${i + 1}`,
  })
);

const Welcome: React.FC = () => {
  return (
    <IMobilePage>
      <NoData title={<IOverflow maxRow={3}>{text}</IOverflow>}>
        <IButton
          onClick={() => {
            snackbar.emit({
              children,
              status: 'error',
            });
          }}
        >
          消息
        </IButton>
        <ISelector multiple options={options} />
      </NoData>
    </IMobilePage>
  );
};

export default Welcome;
