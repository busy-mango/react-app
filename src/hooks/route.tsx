import { useLocation, useNavigate } from 'react-router-dom';

import { toParentCrumbs } from '@/utils/route';

import { useMemoFunc } from './memo.func';

export function useCloseCurrentRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useMemoFunc(() => {
    const parent = toParentCrumbs(pathname);
    navigate(parent ?? '/');
  });
}
