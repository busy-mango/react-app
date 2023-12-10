/**
 * @author mango
 * @description 动态路由
 */

import { useLocation } from 'react-router-dom';

import { WidgetLoader } from '../loader-widget';
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
    <WidgetLoader isLoading={isFetching}>
      {SVGComponent && <SVGComponent />}
    </WidgetLoader>
  );
};

export const DynamicPage: React.FC = () => {
  const { pathname } = useLocation();

  return <Loadable route={pathname} />;
};
