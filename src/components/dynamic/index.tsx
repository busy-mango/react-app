/**
 * @description 动态组件
 */

import { lazy } from 'react';
import { useLocation } from 'react-router-dom';

import Picture from '@/icons/picture.svg';
import { AppEnv, env } from '@/init';
import { devtoolAsync } from '@/utils';

import { useLazyComponent, useLazyIcon } from './hooks';

export const Loadable: React.FC<{
  route?: string;
}> = (props) => {
  const { route } = props;

  const { Component } = useLazyComponent(route);

  return Component && <Component />;
};

export interface DynamicIconProps extends React.SVGProps<SVGAElement> {
  path?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = (props) => {
  const { path, ...others } = props;

  const { SVGComponent } = useLazyIcon(path);

  return SVGComponent ? <SVGComponent {...others} /> : <Picture {...others} />;
};

export const DynamicPage: React.FC = () => {
  const { pathname } = useLocation();

  return <Loadable route={pathname} />;
};

const isAllowDebug = env.name !== AppEnv.Prod;

export const ReactQueryDevtools = isAllowDebug && lazy(devtoolAsync);
