import { Fragment } from 'react';
import classNames from 'classnames';

import EmptySVG from '@/icons/business/empty.svg?react';

import type { IFlexProps } from '../flex';
import { IFlex } from '../flex';
import { ISuspense } from '../suspense';

import * as styles from './index.scss';

export interface IEmptyWrapProps extends Partial<IFlexProps> {
  isLoading?: boolean;
}

export const IEmptyWrap: React.FC<IEmptyWrapProps> = ({
  isLoading,
  className,
  children,
  ...others
}) => (
  <IFlex
    centered
    vertical
    className={classNames(styles.wrap, className)}
    {...others}
  >
    <ISuspense isLoading={isLoading}>
      {children ?? (
        <Fragment>
          <EmptySVG className={styles.icon} />
          <span className={styles.text}>暂无数据</span>
        </Fragment>
      )}
    </ISuspense>
  </IFlex>
);
