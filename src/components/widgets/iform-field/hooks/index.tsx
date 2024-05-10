import { createContext, useContext, useMemo } from 'react';

import type { PartialPick } from '@busymango/utils';

import type { ReactCFC } from '@/models';

import type { IFieldGridProps } from '../models';

interface IFieldGridContextVal extends PartialPick<IFieldGridProps, 'mode'> {}

const IFieldGridContext = createContext<IFieldGridContextVal>(null!);

export const IFieldGridProvider: ReactCFC<IFieldGridContextVal> = ({
  children,
  mode,
}) => (
  <IFieldGridContext.Provider value={useMemo(() => ({ mode }), [mode])}>
    {children}
  </IFieldGridContext.Provider>
);

export const useIFieldGridContext = (): IFieldGridContextVal | undefined => {
  return useContext(IFieldGridContext) ?? undefined;
};
