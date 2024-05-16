import { motion } from 'framer-motion';

import { IFlex } from '@/components';
import type { TodoModel } from '@/service';

export const ProcessTodoCard: React.FC<{
  record: TodoModel;
}> = ({ record }) => (
  <motion.div>
    <IFlex>
      <div>{record.name}</div>
      <div>{record.relUrl}</div>
    </IFlex>
    <div>{record.processInstanceId}</div>
    <div>{record.content}</div>
  </motion.div>
);
