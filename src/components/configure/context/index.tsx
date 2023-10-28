/**
 * @author 徐子梁
 * @description react app context
 */

import { useMemo, useState } from 'react';

import { createContext } from 'react';
import { ReactAction } from '@models/index';
import { QueryClient } from '@tanstack/react-query';

/** react-query store client */
export const client = new QueryClient();

/** APP 上下文类型定义 */
export interface AppContextVal {
  /** 主题样式 */
  theme?: string;
  /** 更新主题样式 */
  setTheme?: ReactAction<string>;
}

/** APP 上下文 */
export const AppContext = createContext<AppContextVal>(null!);

export interface AppProviderProps extends React.PropsWithChildren {
  initial: {
    theme: string;
  };
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children, initial } = props;

  const [_theme, setTheme] = useState(
    initial?.theme,
  );

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          theme: _theme,
          setTheme,
        }),
        [_theme],
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

