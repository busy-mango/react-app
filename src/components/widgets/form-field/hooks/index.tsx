import { createContext, useContext, useMemo } from 'react';

import type { ReactCFC } from '@/models';

import type { IFieldCellContextVal } from '../models';

const IFieldCellContext = createContext<IFieldCellContextVal>(null!);

export const useIFieldCellContext = (): IFieldCellContextVal | undefined => {
  return useContext(IFieldCellContext) ?? undefined;
};

export const IFieldProvider: ReactCFC<IFieldCellContextVal> = (props) => {
  const { forceRenderTitle, align, children, margin, size, colon } = props;

  const {
    size: _size,
    align: _align,
    colon: _colon,
    margin: _margin,
    forceRenderTitle: _forceRenderTitle,
  } = useIFieldCellContext() ?? {};

  return (
    <IFieldCellContext.Provider
      value={useMemo(
        () => ({
          size: size ?? _size,
          align: align ?? _align,
          colon: colon ?? _colon,
          margin: margin ?? _margin,
          forceRenderTitle: forceRenderTitle ?? _forceRenderTitle,
        }),
        [
          align,
          _align,
          colon,
          _colon,
          size,
          _size,
          margin,
          _margin,
          forceRenderTitle,
          _forceRenderTitle,
        ]
      )}
    >
      {children}
    </IFieldCellContext.Provider>
  );
};
