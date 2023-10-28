/**
 * @author 徐子梁
 * @description 路由上下文
 */

import { PropsWithChildren, createContext, useMemo, useState } from 'react';

import { SuspenseContextVal } from '@routers/models';

export const SuspenseContext = createContext<SuspenseContextVal>(null!);

export const SuspenseProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const fadeOut = useState(false);
  const loadable = useState(false);

  return (
    <SuspenseContext.Provider
      value={useMemo(() => ({
          isComplete: fadeOut[0],
          setComplete: fadeOut[1],
          isLoadable: loadable[0],
          setLoadable: loadable[1],
        }),
        [fadeOut[0], loadable[0]],
      )}
    >
      {children}
    </SuspenseContext.Provider>
  )
}
