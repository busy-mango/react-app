import { useMemo } from 'react';
import classNames from 'classnames';

import Refresh from '@/icons/refresh.svg';
import { catchMsg, isNotFoundError } from '@/utils';

import { useFallbackContext } from '../../hooks';
import { ErrorAlert, NotFound } from '../error-content';

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