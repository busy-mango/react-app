/**
 * @description 首页
 */

import { useState } from 'react';

import { iArray, theFirst } from '@busymango/utils';

import type { ControlOptionModel, ISignType } from '@/components';
import { IPage, ISelector, ISignLine } from '@/components';

import styles from './index.scss';

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
  const [sign, setSign] = useState<ISignType>('clock');

  return (
    <IPage>
      <ISelector
        options={
          [
            { value: 'tick' },
            { value: 'plus' },
            { value: 'minus' },
            { value: 'cross' },
            { value: 'clock' },
            { value: 'helper' },
            { value: 'informer' },
            { value: 'magnifier' },
            { value: 'arrowTop' },
            { value: 'arrowLeft' },
            { value: 'arrowRight' },
            { value: 'arrowBottom' },
            { value: 'arrowDoubleTop' },
            { value: 'arrowDoubleLeft' },
            { value: 'arrowDoubleRight' },
            { value: 'arrowDoubleBottom' },
          ] satisfies { value: ISignType }[]
        }
        prefix={<ISignLine ring className={styles.icon} type={sign} />}
        value={sign}
        onChange={(val) => {
          setSign(theFirst(iArray(val)) as ISignType);
        }}
      />
      <ISelector multiple options={options} />
      <div className={styles.area}>123</div>
      <div className={styles.area}>123</div>
      <div className={styles.area}>123</div>
      <div className={styles.area}>123</div>

      <div className={styles.area}>123</div>
      <div className={styles.area}>123</div>
      <div className={styles.area}>123</div>

      <div className={styles.stickey}>stickey</div>
    </IPage>
  );
};

export default Welcome;
