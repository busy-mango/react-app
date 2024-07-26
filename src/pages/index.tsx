/**
 * @description 首页
 */

import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { iArray, theFirst } from '@busymango/utils';

import type { ControlOptionModel, ISignType } from '@/components';
import { IChip, IPage, ISelector, ISignLine, snackbar } from '@/components';
import { useEffectOnce } from '@/hooks';

import styles from './index.scss';

const options = Array.from<unknown, ControlOptionModel>(
  { length: 10000 },
  (_, i) => ({
    value: i,
    label: `item ${i + 1}`,
    title: `item ${i + 1}`,
  })
);

const HalloWorld: React.FC = () => (
  <span>
    <Trans
      components={{
        italic: <i />,
        bold: <strong />,
        code: <IChip size="mini" variant="filled" />,
      }}
      i18nKey="common:Hallo world"
    />
  </span>
);

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  const [sign, setSign] = useState<ISignType>('clock');

  useEffectOnce(() => {
    snackbar.warn({ children: <HalloWorld /> });
  });

  return (
    <IPage className={styles.page}>
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
      <div className={styles.area}>{t('common:Confirm')}</div>
      <div className={styles.area}>{t('common:Confirm')}</div>
      <div className={styles.stickey}>stickey</div>
    </IPage>
  );
};

export default Welcome;
