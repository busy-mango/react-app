import { IClipSpinner } from '@/components/widgets';

import styles from './index.scss';

export const SuspenseFallbackWidget = IClipSpinner;

export const SuspenseFallbackModule: React.FC = () => (
  <div className={styles.module}>
    <IClipSpinner />
  </div>
);
