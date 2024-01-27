import { useLocation, useNavigate } from 'react-router-dom';

import { toParentCrumbs } from '@/utils';

import { useMemoFunc } from '../basic';

/** 根据面包屑返回到上一级路由 */
export function useCloseCurrentRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useMemoFunc(() => {
    const parent = toParentCrumbs(pathname);
    navigate(parent ?? '/');
  });
}
