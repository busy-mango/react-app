import { createContext, useContext, useMemo } from 'react';

import type { ReactCFC } from '@/models';

import type { IFieldCellContextVal } from '../models';

const IFieldCellContext = createContext<IFieldCellContextVal>(null!);

export const useIFieldCellContext = (): IFieldCellContextVal | undefined =>
  useContext(IFieldCellContext) ?? undefined;

export const IFieldProvider: ReactCFC<IFieldCellContextVal> = (props) => {
  const {
    grid,
    span,
    size,
    colon,
    align,
    margin,
    columns,
    children,
    forceRenderTitle = false,
  } = props;

  const {
    span: _span,
    grid: _grid,
    size: _size,
    align: _align,
    colon: _colon,
    margin: _margin,
    columns: _columns,
    forceRenderTitle: _forceRenderTitle,
  } = useIFieldCellContext() ?? {};

  return (
    <IFieldCellContext.Provider
      value={useMemo(
        () => ({
          span: span ?? _span,
          grid: grid ?? _grid,
          size: size ?? _size,
          align: align ?? _align,
          colon: colon ?? _colon,
          margin: margin ?? _margin,
          columns: columns ?? _columns,
          forceRenderTitle: forceRenderTitle ?? _forceRenderTitle,
        }),
        [
          span,
          _span,
          size,
          _size,
          grid,
          _grid,
          align,
          _align,
          colon,
          _colon,
          margin,
          _margin,
          _columns,
          columns,
          forceRenderTitle,
          _forceRenderTitle,
        ]
      )}
    >
      {children}
    </IFieldCellContext.Provider>
  );
};
