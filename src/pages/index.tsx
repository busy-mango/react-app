/**
 * @description 首页
 */

import { useState } from 'react';

import { iArray, theFirst } from '@busymango/utils';

import type { ControlOptionModel, ISignType } from '@/components';
import {
  IButton,
  IFlex,
  IOverflow,
  IPage,
  ISelector,
  ISignLine,
  NoData,
  snackbar,
} from '@/components';

import styles from './index.scss';

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
  const [sign, setSign] = useState<ISignType>('clock');

  return (
    <IPage>
      <NoData title={<IOverflow maxRow={3}>{text}</IOverflow>}>
        <IFlex vertical gap={24}>
          <IFlex gap={12}>
            <IButton
              onClick={() => {
                snackbar.emit({
                  id: 'id',
                  children,
                });
              }}
            >
              Hallo Word
            </IButton>
            <IButton
              onClick={() => {
                snackbar.error({ children: '消息2' });
              }}
            >
              消息
            </IButton>
          </IFlex>
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
        </IFlex>
      </NoData>
    </IPage>
  );
};

export default Welcome;
