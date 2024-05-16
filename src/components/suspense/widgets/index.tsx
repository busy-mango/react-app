import { IClipSpinner, IFlex } from '@/components/widgets';

import styles from './index.scss';

export const SuspenseFallbackWidget = IClipSpinner;

export const SuspenseFallbackModule: React.FC = () => (
  <IFlex align="center" className={styles.module} justify="center">
    <IClipSpinner />
  </IFlex>
);
