import { NoSSR } from 'rspress/runtime';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const client = new QueryClient({
  queryCache: new QueryCache({}),
});

export function configure<P extends object>(Component: React.ComponentType<P>) {
  const ConfigureComponent: React.FC<P> = (props) => (
    <NoSSR>
      <QueryClientProvider client={client}>
        <Component {...props} />
      </QueryClientProvider>
    </NoSSR>
  );
  return ConfigureComponent;
}
