/**
 * @description boundary error widgets
 */

import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { NotFound, Unknown } from '@/components/business';
import { IButton } from '@/components/widgets';
import { catchMsg, isNotFoundError } from '@/utils';

import RefreshSVG from '@/icons/refresh.svg';

import { useFallbackContext } from '../../hooks';

import * as styles from './index.scss';

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
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { error, info, reset } = useFallbackContext();

  if (isNotFoundError(error)) {
    return (
      <NotFound
        title={
          <Fragment>
            {t('common:Page not found')}
            <span
              style={{
                marginLeft: 'var(--gap-3)',
                fontSize: 'var(--font-size-4)',
              }}
            >
              <IButton
                size="inline"
                variant="text"
                onClick={() => {
                  navigate('/', { replace: true });
                  reset?.();
                }}
              >
                {t('common:Home')}
              </IButton>
            </span>
          </Fragment>
        }
      />
    );
  }

  return <Unknown description={info?.componentStack} title={catchMsg(error)} />;
};
