/**
 * @author 徐子梁
 * @description 页面懒加载(react-query)改进版
 */

import { useLocation } from 'react-router-dom';

import { QueryBoundary } from '@components/boundary';
import { ErrorPage } from '@components/error-page';
import { useLazyComponent } from '@routers/hooks';
import { SuspenseProvider } from '@routers/context';
import { PageLoaderBar } from '@routers/components/page-loader-bar';

export const PageLazyLoader: React.FC<{
  route?: string;
}> = (props) => {
  const { route = '' } = props;
  const { data: Lazy } = useLazyComponent(route);

  return (
    <PageLoaderBar>
      {Lazy && <Lazy />}
    </PageLoaderBar>
  );
}

export const PageLoader: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <QueryBoundary
      key={pathname}
      fallback={<ErrorPage />}
    >
      <SuspenseProvider>
        <PageLazyLoader route={pathname} />
      </SuspenseProvider>
    </QueryBoundary>
  );
};
