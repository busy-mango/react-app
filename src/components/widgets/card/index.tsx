import { motion } from 'framer-motion';

import type { ICardProps } from './models';

import * as styles from './index.scss';

export const ICard: React.FC<ICardProps> = (props) => {
  const { title, extra, children, footer } = props;

  return (
    <motion.div className={styles.wrap}>
      <div>
        {title}
        {extra}
      </div>
      {children}
      {footer}
    </motion.div>
  );
};
