/**
 * @author mango
 * @description 动态路由
 */

import { useLocation } from 'react-router-dom';

import { SuspenseWidget } from '../suspense';
import { useLazyComponent, useLazyIcon } from './hooks';

export const Loadable: React.FC<{
  route?: string;
}> = (props) => {
  const { route } = props;

  const { Component } = useLazyComponent(route);

  return Component && <Component />;
};

export const DynamicIcon: React.FC<{
  path?: string;
}> = (props) => {
  const { path } = props;

  const { SVGComponent, isFetching } = useLazyIcon(path);

  return (
    <SuspenseWidget isLoading={isFetching}>
      {SVGComponent && <SVGComponent />}
    </SuspenseWidget>
  );
};

export const DynamicPage: React.FC = () => {
  const { pathname } = useLocation();

  return <Loadable route={pathname} />;
};
