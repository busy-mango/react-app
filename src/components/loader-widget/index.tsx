import { Suspense } from 'react';

import Loader from '@/icons/loader.svg';
import type { ReactComponentFC } from '@/models';
import { isFalse } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

const icon = <Loader className="animate-spin" />;

const SusLoader: ReactComponentFC = (props) => {
  const { children } = props;
  return <Suspense fallback={icon}>{children}</Suspense>;
};

export const WidgetLoader: ReactComponentFC<{
  isLoading?: boolean;
}> = (props) => {
  const { children, isLoading = false } = props;
  return ifnot(isFalse(isLoading) && <SusLoader>{children}</SusLoader>, icon);
};
