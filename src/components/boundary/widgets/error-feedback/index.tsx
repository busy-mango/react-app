/**
 * @description boundary error widgets
 */

import { useMemo } from 'react';
import classNames from 'classnames';

import { NotFound, Unknown } from '@/components/business';
import { catchMsg, isNotFoundError } from '@/utils';

import RefreshSVG from '@/icons/refresh.svg';

import { useFallbackContext } from '../../hooks';

import styles from './index.scss';

export const BoundaryFallbackWidget: React.FC<{
  autoSize?: boolean;
}> = (props) => {
  const { autoSize } = props;

  const { error, reset } = useFallbackContext();

  const msg = useMemo(() => catchMsg(error), [error]);

  return (
    <span className={classNames(styles.widget, autoSize && styles.autoSize)}>
      <input readOnly title={msg} value={msg} />
      <RefreshSVG onClick={reset} />
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

  return <Unknown description={info?.componentStack} title={catchMsg(error)} />;
};
