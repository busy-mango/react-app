/**
 * @author 徐子梁
 */

import { useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

// import NotFoundSVG from '@icons/not.found.svg';

import styles from './index.scss';
import { useFallbackContext } from '../boundary/hooks';
import { isNotFoundPage } from '@/service/errors';

const NotFound: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <Fragment>
      <h2 className={styles.title}>你来到了没有知识的荒原</h2>
      {/* <NotFoundSVG className={styles.icon} /> */}
    </Fragment>
  );
};

function useErrorContent(error: unknown) {
  return useMemo(
    () => {
      if (isNotFoundPage(error)) {
        return <NotFound/>
      }
    },
    [ error ],
  );
}

export const ErrorPage: React.FC = () => {
  const { error } = useFallbackContext();
  return (
    <div className={styles.wrapper}>
      {useErrorContent(error) ?? (
        <Fragment>
          <h2 className={styles.title}>出错了</h2>
        </Fragment>
      )}
    </div>
  );
};