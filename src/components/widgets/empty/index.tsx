import { Fragment } from 'react';
import classNames from 'classnames';

import EmptySVG from '@/icons/business/empty.svg?react';

import type { IFlexProps } from '../flex';
import { IFlex } from '../flex';
import { ISuspense } from '../suspense';

import * as styles from './index.scss';

export interface IEmptyWrapProps extends Partial<IFlexProps> {
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const IEmptyWrap: React.FC<IEmptyWrapProps> = ({
  isLoading,
  className,
  children,
  isEmpty,
  ...others
}) => (
  <IFlex
    centered
    vertical
    className={classNames(styles.wrap, className)}
    {...others}
  >
    <ISuspense isLoading={isLoading}>
      {isEmpty ? (
        <Fragment>
          <EmptySVG className={styles.icon} />
          <span className={styles.text}>暂无数据</span>
        </Fragment>
      ) : (
        children
      )}
    </ISuspense>
  </IFlex>
);
