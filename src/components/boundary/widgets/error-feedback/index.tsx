/**
 * @description boundary error widgets
 */

import { useMemo } from 'react';
import classNames from 'classnames';

import { ifnot } from '@busymango/utils';

import Refresh from '@/icons/refresh.svg';
import type { ReactCFC } from '@/models';
import { catchMsg, isNotFoundError } from '@/utils';

import { useFallbackContext } from '../../hooks';

import styles from './index.scss';

/** 找不到数据 */
export const NotData: React.FC = () => <h1>暂无数据</h1>;

/** 资源403 */
export const NotAuth: React.FC = () => <h1>没有权限</h1>;

/** 资源404 */
export const NotFound: React.FC = () => <h1>你来到了没有知识的荒原</h1>;

/** 服务端维护中 */
export const BeingMaintained: React.FC = () => <h1>服务端维护中</h1>;

/** 模块异常信息 */
export const ErrorAlert: ReactCFC = ({ children }) => (
  <h2>
    {ifnot(
      children && (
        <pre style={{ fontSize: '0.9em', overflowX: 'auto' }}>{children}</pre>
      )
    )}
  </h2>
);

export const BoundaryFallbackWidget: React.FC<{
  autoSize?: boolean;
}> = (props) => {
  const { autoSize } = props;

  const { error, reset } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return (
    <span className={classNames(styles.widget, autoSize && styles.autoSize)}>
      <input readOnly title={msg} value={msg} />
      <Refresh onClick={reset} />
    </span>
  );
};

export const BoundaryFallbackCard: React.FC = () => {
  const { error } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return <div className={styles.card}>{msg}</div>;
};

export const BoundaryFallbackPage: React.FC = () => {
  const { error, info } = useFallbackContext();

  if (isNotFoundError(error)) return <NotFound />;

  const { componentStack: description } = info ?? {};

  return <ErrorAlert>{description}</ErrorAlert>;
};
