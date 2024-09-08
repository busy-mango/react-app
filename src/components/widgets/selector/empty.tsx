import EmptySVG from '@/icons/business/empty.svg?react';

import { IFlex } from '../flex';
import { ISuspense } from '../suspense';

import * as styles from './empty.scss';

export const EmptyWrap: React.FC<{
  isLoading?: boolean;
}> = ({ isLoading }) => (
  <IFlex centered vertical className={styles.wrap}>
    <ISuspense isLoading={isLoading}>
      <EmptySVG className={styles.icon} />
      <span className={styles.text}>暂无数据</span>
    </ISuspense>
  </IFlex>
);
