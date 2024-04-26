/**
 * @description App 自定义 Key
 */

import { nanoid } from 'nanoid';

/**************** ReactQueryKey ************************/

export const SNIFFER_KEY = nanoid();

export const PAGE_LOADER_KEY = nanoid();

export const ICON_LOADER_KEY = nanoid();

/**************** LocalStorageKey ************************/

export const UPDATE_RETRY_COUNT = 'APP:UPDATE_RETRY_COUNT';
