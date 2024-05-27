import { motion } from 'framer-motion';

import { IFlex } from '@/components';
import iAvatarSrc from '@/images/avatar.@4x.webp';
import type { TodoModel } from '@/service';

import styles from './index.scss';

export const MeetingCard: React.FC<{
  record: TodoModel;
}> = ({ record }) => (
  <motion.div className={styles.card}>
    <IFlex align="flex-end" className={styles.header} justify="flex-start">
      <img className={styles.avatar} src={iAvatarSrc} />
      <div className={styles.creator}>{record.name}</div>
      <div>{record.relUrl}</div>
    </IFlex>
    <div className={styles.content}>{record.content}</div>
  </motion.div>
);
