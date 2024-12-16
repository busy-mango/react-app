import FetchDriver from '@busymango/fetch-driver';

import { common, exception } from './middlewares';

const { drive, request } = new FetchDriver([
  common,
  exception,
  async ({ api, options }, next) => {
    const { headers } = options;

    if (api.includes('rapidapi.com')) {
      headers.set(
        'x-rapidapi-key',
        'f6c2f43925msh7e078a98f85c3c2p1e5194jsncbac11d626ea'
      );
      try {
        const { host } = new URL(api);
        headers.set('x-rapidapi-host', host);
      } catch (error) {
        console.warn('Api需要包含域名信息');
      }
    }

    await next();
  },
]);

export { drive, request };
