/**
 * @description 动态组件
 */

import { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { isNil } from '@busymango/is-esm';
import { useQuery } from '@tanstack/react-query';

import { AppEnv, env } from '@/init';
import type { ReactSvgProps } from '@/models';
import { caseAsync, devtoolAsync } from '@/utils';

import Picture from '@/icons/picture.svg';

import { useLazyComponent, useLazyIcon } from './hooks';

export const Loadable: React.FC<{
  route?: string;
}> = (props) => {
  const { route } = props;

  const { Component } = useLazyComponent(route);

  return Component && <Component />;
};

export interface DynamicIconProps extends ReactSvgProps {
  path?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = (props) => {
  const { path, ...others } = props;

  const { SVGComponent } = useLazyIcon(path);

  return SVGComponent ? <SVGComponent {...others} /> : <Picture {...others} />;
};

export const DynamicPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence key={pathname} mode="wait">
      <Loadable route={pathname} />
    </AnimatePresence>
  );
};

export const DynamicCase: React.FC = () => {
  const { pathname } = useLocation();

  const route = pathname.replace('/examples', '');

  const { data: Component } = useQuery({
    queryKey: ['Examples', env.version, route],
    queryFn: async () => {
      const chunk = await caseAsync(route);
      if (!isNil(chunk.default)) return chunk.default;
      throw new Error(`Loading example ${route} failed`);
    },
    throwOnError: false,
  });

  return (
    <AnimatePresence key={pathname} mode="wait">
      {Component && <Component />}
    </AnimatePresence>
  );
};

export const isNonProd = env.name !== AppEnv.Prod;

export const ReactQueryDevtools = isNonProd && lazy(devtoolAsync);
