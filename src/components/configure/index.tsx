/**
 * @author 徐子梁
 * @description react app configure
 */

import { QueryClientProvider } from '@tanstack/react-query';

import { theme } from '@/~init';

import { AppProvider, client } from './context';

/** app config */
export const Configure: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  
  return (
    <QueryClientProvider client={client}>
      <AppProvider
        initial={{
          theme: theme.default,
        }}
      >
        {children}
      </AppProvider>
    </QueryClientProvider>
  );
};

export * from './hooks';
