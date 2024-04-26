import FetchDriver from '@busymango/fetch-driver';

import { common, exception } from './middlewares';

const { drive, request } = new FetchDriver([common, exception]);

export { drive, request };
