import { IFieldGrid, ProductFieldCard } from '@/components';

import styles from './index.scss';

export const ProductMeetingProductMgmt: React.FC = () => {
  return (
    <IFieldGrid
      className={styles.card}
      colon={false}
      margin={false}
      mode="between"
    >
      <ProductFieldCard />
      <ProductFieldCard />
    </IFieldGrid>
  );
};
