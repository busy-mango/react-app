import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SysUserShell } from '@/components/business';
import { IFlex } from '@/components/widgets';
import { DateFormatEn } from '@/constants';
import { useMemoFunc } from '@/hooks';
import type { TodoModel } from '@/service';
import { iSearchParams } from '@/service';
import { iDayjs } from '@/utils';

import iAvatarSrc from '@/images/avatar.@4x.webp';

import styles from './index.scss';

export const MeetingCard: React.FC<{
  record: TodoModel;
}> = (props) => {
  const { record } = props;

  const navigate = useNavigate();

  const {
    content,
    processStartUserId,
    processTaskInstanceId,
    processTaskStartTime,
  } = record;

  const onTab = useMemoFunc(() => {
    const params = iSearchParams({ id: processTaskInstanceId });
    navigate(`/offsite-meeting-vote?${params?.toString() ?? ''}`);
  });

  return (
    <motion.div className={styles.card} onClick={onTab}>
      <IFlex align="flex-end" className={styles.header} justify="flex-start">
        <img className={styles.avatar} src={iAvatarSrc} />
        <SysUserShell id={processStartUserId}>
          {({ name, deptName }) => (
            <div>
              {name}
              {deptName && `(${deptName})`}
            </div>
          )}
        </SysUserShell>
        <span>
          {iDayjs(processTaskStartTime)?.format(DateFormatEn.DateSec)}
        </span>
      </IFlex>
      <div className={styles.content}>{content}</div>
    </motion.div>
  );
};
