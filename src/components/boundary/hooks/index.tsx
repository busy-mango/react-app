/**
 * @description ErrorBoundary Hooks
 */

import { Fragment, useContext, useMemo } from 'react';

import { isNotFoundError } from '@/utils';

import { FallbackContext } from '../context';

/** Fallback context hooks */
export function useFallbackContext() {
  return useContext(FallbackContext) ?? {};
}

const NotFound: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <Fragment>
      你来到了没有知识的荒原
      {/* <NotFoundSVG className={styles.icon} /> */}
    </Fragment>
  );
};

export function useErrorContent() {
  const { error } = useFallbackContext();

  return useMemo(() => {
    if (isNotFoundError(error)) {
      return <NotFound />;
    }
  }, [error]);
}
