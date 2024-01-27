/**
 * @description 动态组件
 */

import { lazy } from 'react';
import { useLocation } from 'react-router-dom';

import { AppEnv, env } from '@/init';
import { devtoolAsync } from '@/utils';

import { useLazyComponent, useLazyIcon } from './hooks';

const placeholder = <svg height="1em" width="1em" />;

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

  const { SVGComponent } = useLazyIcon(path);

  return SVGComponent ? <SVGComponent /> : placeholder;
};

export const DynamicPage: React.FC = () => (
  <Loadable route={useLocation().pathname} />
);

export const ReactQueryDevtools =
  env.name !== AppEnv.Prod && lazy(devtoolAsync);
