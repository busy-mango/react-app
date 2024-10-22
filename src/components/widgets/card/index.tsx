import { motion } from 'framer-motion';

import { IFlex } from '../flex';
import type { ICardProps } from './models';

import * as styles from './index.scss';

export const ICard: React.FC<ICardProps> = (props) => {
  const { title, extra, children, footer, ...others } = props;

  return (
    <motion.div className={styles.wrap} {...others}>
      <IFlex align="center" justify="space-between">
        {title}
        {extra}
      </IFlex>
      {children}
      {footer}
    </motion.div>
  );
};
