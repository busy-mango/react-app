import { useState } from 'react';

import { iArray, theFirst } from '@busymango/utils';

import type { ISignType } from '@/components';
import { IPage, ISelector, ISignLine } from '@/components';

import styles from './index.scss';

const options = [
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
] satisfies { value: ISignType }[];

const Welcome: React.FC = () => {
  const [sign, setSign] = useState<ISignType>('clock');
  return (
    <IPage className={styles.page}>
      <ISelector
        options={options}
        prefix={<ISignLine ring className={styles.icon} type={sign} />}
        value={sign}
        onChange={(val) => {
          setSign(theFirst(iArray(val)) as ISignType);
        }}
      />
    </IPage>
  );
};

export default Welcome;
