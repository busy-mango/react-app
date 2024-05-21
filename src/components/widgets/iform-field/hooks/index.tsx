import { createContext, useContext, useMemo } from 'react';

import type { ReactCFC } from '@/models';

import type { IFieldGridContextVal } from '../models';

const IFieldGridContext = createContext<IFieldGridContextVal>(null!);

export const useIFieldGridContext = (): IFieldGridContextVal | undefined => {
  return useContext(IFieldGridContext) ?? undefined;
};

export const IFieldGridProvider: ReactCFC<IFieldGridContextVal> = (props) => {
  const { forceRenderTitle, children, margin, mode, size, colon } = props;

  const {
    mode: _mode,
    size: _size,
    colon: _colon,
    margin: _margin,
    forceRenderTitle: _forceRenderTitle,
  } = useIFieldGridContext() ?? {};

  return (
    <IFieldGridContext.Provider
      value={useMemo(
        () => ({
          mode: mode ?? _mode,
          size: size ?? _size,
          colon: colon ?? _colon,
          margin: margin ?? _margin,
          forceRenderTitle: forceRenderTitle ?? _forceRenderTitle,
        }),
        [
          colon,
          _colon,
          size,
          _size,
          mode,
          _mode,
          margin,
          _margin,
          forceRenderTitle,
          _forceRenderTitle,
        ]
      )}
    >
      {children}
    </IFieldGridContext.Provider>
  );
};
