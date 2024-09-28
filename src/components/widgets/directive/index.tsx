import classNames from 'classnames';
import { motion } from 'framer-motion';

import type { ReactCFC } from '@/models';
import { isReactNode } from '@/utils';

import * as styles from './index.scss';

export interface IDirectiveProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

export const IDirective: ReactCFC<IDirectiveProps> = (props) => {
  const { icon, title, extra, children } = props;

  return (
    <motion.div
      className={classNames(styles.wrap, {
        [styles.withIcon]: icon && isReactNode(icon),
      })}
    >
      <div>{icon}</div>
      <div>
        <div className={styles.header}>
          {title}
          {extra}
        </div>
        <div>{children}</div>
      </div>
    </motion.div>
  );
};
