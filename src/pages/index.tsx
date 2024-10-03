/**
 * @description 首页
 */

import { Trans, useTranslation } from 'react-i18next';

import { IChip, ISafeArea, snackbar } from '@/components';
import { useEffectOnce } from '@/hooks';

import * as styles from './index.scss';

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

  useEffectOnce(() => {
    snackbar.warn({ children: <HalloWorld /> });
  });

  return (
    <ISafeArea className={styles.page}>
      <div className={styles.area}>{t('common:Confirm')}</div>
      <div className={styles.area}>{t('common:Confirm')}</div>
    </ISafeArea>
  );
};

export default Welcome;
