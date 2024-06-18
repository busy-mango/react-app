import { createContext, useContext } from 'react';

import type { MenuContextVal } from '../models';

const Context = createContext<MenuContextVal>({
  open: false,
  activeIndex: null,
  iItemProps: () => ({}),
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
});

export const MenuProvider = Context.Provider;

export const useMenuContext = () => {
  return useContext(Context) ?? undefined;
};
