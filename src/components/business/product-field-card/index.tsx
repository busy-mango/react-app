import { IFlex, IFormCard } from '@/components/widgets';
import type { ReactCFC } from '@/models';

import styles from './index.scss';

export interface ProductFormCardProps {
  title?: React.ReactNode;
}

export const ProductFieldCard: ReactCFC = () => {
  return (
    <div className={styles.card}>
      <IFlex className={styles.header}>月月盈一号</IFlex>
      <IFormCard
        parts={[
          {
            title: '基础信息',
          },
          {
            title: '投票意见',
          },
        ]}
      />
    </div>
  );
};
