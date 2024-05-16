import { createContext, useContext, useMemo } from 'react';

import type { ReactCFC } from '@/models';

import type { IFieldGridContextVal } from '../models';

const IFieldGridContext = createContext<IFieldGridContextVal>(null!);

export const IFieldGridProvider: ReactCFC<IFieldGridContextVal> = ({
  forceRenderTitle,
  children,
  margin,
  mode,
  size,
  colon,
}) => (
  <IFieldGridContext.Provider
    value={useMemo(
      () => ({ size, colon, mode, margin, forceRenderTitle }),
      [colon, size, mode, margin, forceRenderTitle]
    )}
  >
    {children}
  </IFieldGridContext.Provider>
);

export const useIFieldGridContext = (): IFieldGridContextVal | undefined => {
  return useContext(IFieldGridContext) ?? undefined;
};
