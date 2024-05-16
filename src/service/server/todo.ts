import { SYSTEM_USER_TODO_LIST_API } from '@/constants';

import { drive } from '../drive';
import { iSearchParams, iServerData, iSrc } from '../helpers';
import type { TodoListQueryBody, TodoListQueryParams } from '../models';

/** 请求待办列表 */
export const list = async (params: TodoListQueryParams) =>
  iServerData(
    drive<TodoListQueryBody>(
      iSrc(SYSTEM_USER_TODO_LIST_API),
      iSearchParams(params)
    )
  );
