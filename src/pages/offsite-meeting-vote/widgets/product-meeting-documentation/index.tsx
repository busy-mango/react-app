import { IAttachmentGroup } from '@/components';

import styles from './index.scss';

export const ProductMeetingDocumentation: React.FC = () => (
  <IAttachmentGroup
    className={styles.wrap}
    items={[
      {
        id: 'asdas',
        name: 'asdsad',
      },
    ]}
  />
);
